import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { editData } from '../context/ContextProvider'

const FuncionarioEdit = () => {
  const { upData, setUpData } = useContext(editData)

  const navigate = useNavigate()

  const [frase, setFrase] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    nnis: '',
  })

  const setdata = (e) => {
    console.log(e.target.value)
    const { name, value } = e.target
    setFrase((preval) => {
      return {
        ...preval,
        [name]: value,
      }
    })
  }

  const { id } = useParams('')

  console.log(id)

  const getFuncionario = async () => {
    const res = await fetch(`/get-funcionario/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    console.log(data)

    if (res.status === 422 || !data) {
      console.log('Erro')
    } else {
      setFrase(data)
      console.log('Lista de Funcionários gerada...')
    }
  }

  useEffect(() => {
    getFuncionario()
    // eslint-disable-next-line
  }, [])

  const editFuncionario = async (e) => {
    e.preventDefault()

    const { nome, sobrenome, email, nnis } = frase

    const res2 = await fetch(`/edit-funcionario/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        sobrenome,
        email,
        nnis,
      }),
    })

    const data2 = await res2.json()
    console.log(data2)

    if (res2.status === 422 || !data2) {
      alert('Preencha os dados')
    } else {
      setUpData(data2)
      navigate('/')
    }
  }

  return (
    <div className="container">
      <NavLink to="/">Home2</NavLink>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Nome
            </label>
            <input
              type="text"
              value={frase.nome}
              onChange={setdata}
              name="nome"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3  col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Sobrenome
            </label>
            <input
              type="text"
              value={frase.sobrenome}
              onChange={setdata}
              name="sobrenome"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3  col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Email
            </label>
            <input
              type="email"
              value={frase.email}
              onChange={setdata}
              name="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              Lembre-se de não compartilhar seu email com ninguem.
            </div>
          </div>
          <div class="mb-3  col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Número NIS
            </label>
            <input
              type="number"
              value={frase.nnis}
              onChange={setdata}
              name="nnis"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" onClick={editFuncionario} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default FuncionarioEdit
