import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import CreateIcon from '@mui/icons-material/Create'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { NavLink } from 'react-router-dom'

const Home = () => {
  const [getFuncionarioData, setFuncionarioData] = useState([])

  console.log(getFuncionarioData)

  const getFuncionario = async (e) => {
    const res = await fetch('/get-funcionarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    console.log(data)

    if (res.status === 404 || !data) {
      console.log('Erro')
    } else {
      setFuncionarioData(data)
      console.log('Lista de Funcionários geradas')
    }
  }

  useEffect(() => {
    getFuncionario()
  }, [])

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/add-funcionario" className="btn btn-primary">
            Add Funcionario
          </NavLink>
        </div>
        <table class="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">id</th>
              <th scope="col">Nome</th>
              <th scope="col">Sobrenome</th>
              <th scope="col">Email</th>
              <th scope="col">Número do NIS(PIS)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {getFuncionarioData.map((funcionario, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.sobrenome}</td>
                    <td>{funcionario.email}</td>
                    <td>{funcionario.nnis}</td>
                    <td className="d-flex justify-content-between">
                      <button className="btn btn-success">
                        <RemoveRedEyeIcon />
                      </button>
                      <button className="btn btn-primary">
                        <CreateIcon />
                      </button>
                      <button className="btn btn-danger">
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
