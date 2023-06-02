/*
# Holiday feature

To disable holiday features remove the reference to this file in `vite.config.ts`.
It is then safe to delete this file.

*/
import type {Application} from './declarations.js'
const sleep = (s: number) => new Promise(r => setTimeout(r, (s * 1000) | 0))
const context = {
  app: null as Application,
  lastMessage: -1
}
const getRandom = (e: ArrayLike<string>) => e[(e.length * Math.random()) | 0]
const getNext = (e: ArrayLike<string[]>): string[] => {
  context.lastMessage++
  return e[context.lastMessage % e.length]
}

export const HolidayAssets = {
  name: 'Programming',
  emojii: '🍀',
  emojiis: ['🍀', '🪙', '🌈', '☘️'],
  accentColor: '#009E60',
  bot: {
    name: 'Lucky Leprechaun',
    email: 'featherbot@feathersjs.com',
    password: 'feathers rules',
    avatar: 'https://raw.githubusercontent.com/feathersjs/playground/main/assets/holiday.svg'
  }
}

const greeting = 'Ahoy!'
const HolidayMessages = [
  ["Happy St. Patrick's Day!", 'https://discord.gg/qa8kez8QBx'],
  ['Join our discord!', 'https://discord.gg/qa8kez8QBx'],
  ['Star us on GitHub!', 'https://github.com/feathersjs/feathers'],
  ['Follow us on Twitter!', 'https://twitter.com/feathersjs'],
  ['Read our docs!', 'https://feathersjs.com/guides/basics/starting.html'],
  ['Checkout our Awesome Feathers community packages!', 'https://feathersjs.com/awesome/']
]

async function* spookyAI(text: string) {
  let preText = ''
  const words = text.split(' ')
  for (const word of words) {
    await sleep(word.length * 0.02 + word.length * 0.069 * Math.random())
    preText += ' ' + word
    yield preText
  }
  return ''
}

const sendMessage = async (userId, fullText, anchor) => {
  const messages = context.app.service('messages')
  const message = await messages.create({text: '', userId, anchor})
  const messageId = message[messages.id]
  delete message[messages.id] // task: user a resolver to remove these before validation
  delete message.user

  for await (const text of spookyAI(fullText)) {
    messages.update(messageId, {...message, text})
  }
}

export const HolidayBot = async (app: Application) => {
  context.app = app
  const users = app.service('users')
  const uidField = app.service('users').id
  const bot = await users.create(HolidayAssets.bot)
  const userId = bot[uidField]
  await sendMessage(userId, `Happy ${HolidayAssets.name}!`)

  let lastMessage = 0
  app.on('login', async (authResult: any, {connection: conn}: any) => {
    if (conn) {
      // REST has no real-time connection
      if (lastMessage < Date.now() - 2 * 60 * 1000) {
        await sleep(1)
        // let text = `${greeting}, ${authResult.user.name}`
        // await sendMessage(userId, text)
      }

      // if(user.isAdmin) { app.channel('admins').join(conn) }
      // if(Array.isArray(user.rooms)) user.rooms.forEach(r => app.channel(`rooms/${r.id}`).join(conn))
      // app.channel(`DM/${user.id}`).join(conn) // DMs
    }
  })

  app.service('messages').on('created', async m => {
    await sleep(0.42)
    if (userId !== m.userId) {
      const emo = getRandom(HolidayAssets.emojiis)
      const message = getNext(HolidayMessages)
      sendMessage(userId, emo + ' ' + message[0] + ' ' + emo, message[1])
    }
  })
}

// Allows easy removal
process.env.VITE_HOLIDAY = JSON.stringify(HolidayAssets)
