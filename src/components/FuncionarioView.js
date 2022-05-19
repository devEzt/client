import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CreateIcon from '@mui/icons-material/Create'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { toast } from 'react-toastify'

import api from '../services/api'

const logo = require('../images/profile.png')

const mockUserProfile = {
  username: 'Alexandre Dev',
}

const FuncionarioView = () => {
  const [userToEdit, setUserToEdit] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams('')

  const navigate = useNavigate()

  const getFuncionario = async () => {
    setIsLoading(true)
    try {
      const res = await api.get(`/get-funcionario/${id}`)
      setUserToEdit(res.data)
    } catch (err) {
      throw new Error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFuncionario()
    // eslint-disable-next-line
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
    <div className="container mt-3 ">
      <h1 style={{ fontWeight: 400 }}>{`Bem vindo ${mockUserProfile.username}`}</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit-funcionario/${userToEdit._id}`}>
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>

            <button className="btn btn-danger" onClick={() => handleDelete(userToEdit._id)}>
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src={logo} style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                Nome: <span style={{ fontWeight: 400 }}>{userToEdit.nome}</span>
              </h3>
              <h3 className="mt-3">
                Sobrenome: <span style={{ fontWeight: 400 }}>{userToEdit.sobrenome}</span>
              </h3>
            </div>

            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <MailOutlineIcon />
                Email: <span>{userToEdit.email}</span>
              </p>
              <p className="mt-3">
                <CreditCardIcon />
                Número NIS: <span>{userToEdit.nnis}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FuncionarioView
