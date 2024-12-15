import { Env } from '../types'
import { drizzle } from 'drizzle-orm/d1'
import { messages, emails } from '../app/lib/schema'
import { eq } from 'drizzle-orm'
import PostalMime from 'postal-mime'


const handleEmail = async (message: ForwardableEmailMessage, env: Env) => {
  const db = drizzle(env.DB, { schema: { messages, emails } })

  const parsedMessage = await PostalMime.parse(message.raw)

  console.log("parsedMessage:", parsedMessage)

  try {
    const targetEmail = await db.query.emails.findFirst({
      where: eq(emails.address, message.to)
    })

    if (!targetEmail) {
      console.error(`Email not found: ${message.to}`)
      return
    }

    await db.insert(messages).values({
      // @ts-expect-error to fix
      emailId: targetEmail.id,
      fromAddress: message.from,
      subject: parsedMessage.subject,
      content: parsedMessage.text,
      html: parsedMessage.html || null,
    })

    console.log(`Email processed: ${parsedMessage.subject}`)
  } catch (error) {
    console.error('Failed to process email:', error)
  }
}

const worker = {
  async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
    await handleEmail(message, env)
  }
}

export default worker 