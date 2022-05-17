import React, { useContext, useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import CreateIcon from '@mui/icons-material/Create'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { NavLink } from 'react-router-dom'

import { createData, editData, deleteData } from '../context/ContextProvider'

const Home = () => {
  const [getFuncionarioData, setFuncionarioData] = useState([])
  console.log(getFuncionarioData)

  const { fdata, setFData } = useContext(createData)
  const { upData, setUpData } = useContext(editData)
  const { deletData, setDeletData } = useContext(deleteData)

  const getFuncionario = async (e) => {
    const res = await fetch('/get-funcionarios', {
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
      setFuncionarioData(data)
      console.log('Lista de Funcionários gerada...')
    }
  }

  useEffect(() => {
    getFuncionario()
  }, [])

  const handleDelete = async (id) => {
    const res2 = await fetch(`/delete-funcionario/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const deleteFuncionario = await res2.json()
    console.log(deleteFuncionario)

    if (res2.status === 422 || !deleteFuncionario) {
      console.log('Erro')
    } else {
      console.log('Funcionario Deletado')
      setDeletData(deleteData)
      getFuncionario()
    }
  }

  return (
    <>
      {fdata ? (
        <>
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{fdata.nome}</strong> Funcionário Adicionado com sucesso!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </>
      ) : (
        ''
      )}
      {upData ? (
        <>
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{fdata.nome}</strong> Funcionário Atualizado com sucesso!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </>
      ) : (
        ''
      )}
      {deletData ? (
        <>
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>{deletData.nome}</strong> Funcionário Deletado com sucesso!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </>
      ) : (
        ''
      )}

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
                        <NavLink to={`view-funcionario/${funcionario._id}`}>
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit-funcionario/${funcionario._id}`}>
                          <button className="btn btn-primary">
                            <CreateIcon />
                          </button>
                        </NavLink>
                        <button className="btn btn-danger" onClick={() => handleDelete(funcionario._id)}>
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
    </>
  )
}

export default Home
