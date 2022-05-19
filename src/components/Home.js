import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import CreateIcon from '@mui/icons-material/Create'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../services/api'

const Home = () => {
  const [getFuncionarioData, setFuncionarioData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const getFuncionario = async () => {
    try {
      const res = await api.get(`/get-funcionarios`)
      setFuncionarioData(res.data)
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    getFuncionario()
  }, [])

  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      const res = await api.delete(`/delete-funcionario/${id}`)

      toast.success('Funcionario Deletado com Sucesso!')
      getFuncionario(res.data)
      navigate('/')
    } catch (err) {
      throw new Error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return isLoading ? (
    <div>Está carregando...</div>
  ) : (
    <>
      <div className="mt-5">
        <div className="center">
          <h1 style={{ fontWeight: 400 }}>Bem vindo ao CRUD de Funcionários</h1>
        </div>
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/add-funcionario" className="btn btn-primary">
              Add Funcionario
            </NavLink>
          </div>
          <table className="table">
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
                  <tr key={id}>
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
