import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const FuncionarioForm = () => {
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

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
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

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default FuncionarioForm
