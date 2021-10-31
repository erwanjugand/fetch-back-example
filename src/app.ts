import { Post, User } from "../types";
import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors());
app.options('*', cors());
app.listen(8000, '127.0.0.1');

const users: User[] = []

for (let i = 0; i < 20; i++) {
  const newUser = {
    id: i,
    name: `Mister n°${i}`,
    updatedAt: new Date(-Math.round(Math.random() * 1_000_000))
  }
  users.push(newUser)
}

const posts: Post[] = []

for (let i = 0; i < 200; i++) {
  const randomUser = users[Math.round(Math.random() * (users.length - 1))]
  const newPost = {
    id: i,
    title: `Post n°${i}`,
    authorId: randomUser.id
  }
  posts.push(newPost)
}

// Send post data without users data
app.get('/posts', ({query}, res) => {
  const postToSent = posts.slice(+query.offset, +query.offset + +query.limit)
  const authorIds = postToSent.flatMap(p => p.authorId)
  const uniquAuthorIds = [... new Set(authorIds)]

  const userDatas = uniquAuthorIds.map(i => {
    const user = users.find(u => u.id === i)
    return {
      id: user.id,
      updatedAt: user.updatedAt
    }
  })

  res.send({
    items: postToSent,
    userDatas: userDatas
  })
})

// Send all user data for each id
app.get('/users', ({query}, res) => {
  const ids = (query.ids as string).split(',').map(id => +id)
  const newUsers = users.filter(u => ids.includes(u.id))

  res.send({
    items: newUsers
  })
})
