
import React, { useState } from 'react'
import './aitext.css'

import api from '../apicontroller/apiCenter'

import { FaArrowRight } from "react-icons/fa6"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function AItext() {

  const [messages, setMessages] = useState([])

  const [data, setData] = useState({
    searchingQuestion: ''
  })


  const handlingInput = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  }


  const handlingSubmit = async (e) => {

    e.preventDefault()

    const question = data.searchingQuestion.trim()

    if (!question) return


    // Add user message immediately

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: question
      }
    ])


    // Clear input

    setData({
      searchingQuestion: ''
    })


    try {

      const res = await api.post('/ask', {
        searchingQuestion: question
      })


      console.log('API RESPONSE:', res.data)


      const answer =
        res?.data?.message ||
        'Something went wrong!'


      // Add AI response

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: answer
        }
      ])


    } catch (error) {

      console.log('Chatbot error:', error)


      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Something went wrong. Please try again.'
        }
      ])

    }

  }


  return (

    <div className="aiMainBox">


      {/* =========================
          CHAT AREA
      ========================= */}

      <div className="chatBox">

        <div className="chatMessages">


          {messages.map((message, index) => (

            <div
              key={index}
              className={
                message.role === 'user'
                  ? 'chatBoxUser'
                  : 'chatBoxAi'
              }
            >

              {message.role === 'assistant' ? (

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {message.content}
                </ReactMarkdown>

              ) : (

                message.content

              )}

            </div>

          ))}


          {/* =========================
              WELCOME MESSAGE
          ========================= */}

          {messages.length === 0 && (

            <div className="loadingText">

              <div>

                <h2>👋 Hi!</h2>

                <p>
                  I'm the company assistant.
                </p>

                <p>
                  I'm here to help with company-related
                  questions, policies, benefits, and
                  other workplace information.
                </p>

              </div>

            </div>

          )}


        </div>

      </div>


      {/* =========================
          FLOATING INPUT
      ========================= */}

      <div className="aiCardBox">

        <form onSubmit={handlingSubmit}>

          <input
            type="text"
            name="searchingQuestion"
            value={data.searchingQuestion}
            onChange={handlingInput}
            placeholder="Ask a company-related question..."
            autoComplete="off"
            className="aiText"
          />


          <button
            className="askButton"
            type="submit"
            aria-label="Send message"
          >

            <FaArrowRight />

          </button>

        </form>

      </div>


    </div>

  )

}


export default AItext

