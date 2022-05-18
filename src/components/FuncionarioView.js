import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CreateIcon from '@mui/icons-material/Create'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { toast } from 'react-toastify'

const logo = require('../images/profile.png')

const mockUserProfile = {
  username: 'Alexandre Dev',
}

const FuncionarioView = () => {
  const [getFuncionarioData, setFuncionarioData] = useState([])

  const { id } = useParams('')

  const navigate = useNavigate()

  const getFuncionario = async () => {
    const res = await fetch(`/get-funcionario/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (res.status === 500 || !data) {
      toast.error('Não foi possivel obter o funcionário!!')
    } else {
      setFuncionarioData(data)
    }
  }

  useEffect(() => {
    getFuncionario()
    // eslint-disable-next-line
  }, [])

  const handleDelete = async (id) => {
    const res2 = await fetch(`/delete-funcionario/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const deleteFuncionario = await res2.json()

    if (res2.status === 500 || !deleteFuncionario) {
      toast.error('Não foi possivel Deletar o funcionário!!')
    } else {
      toast.success('Funcionario Deletado com Sucesso!')
      navigate('/')
    }
  }

  return (
    <div className="container mt-3 ">
      <h1 style={{ fontWeight: 400 }}>{`Bem vindo ${mockUserProfile.username}`}</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit-funcionario/${getFuncionarioData._id}`}>
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>

            <button className="btn btn-danger" onClick={() => handleDelete(getFuncionarioData._id)}>
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src={logo} style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                Nome: <span style={{ fontWeight: 400 }}>{getFuncionarioData.nome}</span>
              </h3>
              <h3 className="mt-3">
                Sobrenome: <span style={{ fontWeight: 400 }}>{getFuncionarioData.sobrenome}</span>
              </h3>
            </div>

            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <MailOutlineIcon />
                Email: <span>{getFuncionarioData.email}</span>
              </p>
              <p className="mt-3">
                <CreditCardIcon />
                Número NIS: <span>{getFuncionarioData.nnis}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FuncionarioView
