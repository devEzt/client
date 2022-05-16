import React from 'react'
import CreateIcon from '@mui/icons-material/Create'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import CreditCardIcon from '@mui/icons-material/CreditCard'

const logo = require('../images/profile.png')

const FuncionarioView = () => {
  const mockValues = {
    name: 'James',
  }

  return (
    <div className="container mt-3 ">
      <h1 style={{ fontWeight: 400 }}>{`Bem vindo ${mockValues.name}`}</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <button className="btn btn-primary mx-2">
              <CreateIcon />
            </button>
            <button className="btn btn-danger">
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src={logo} style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                Nome: <span style={{ fontWeight: 400 }}>James</span>
              </h3>
              <h3 className="mt-3">
                Sobrenome: <span style={{ fontWeight: 400 }}>Bond</span>
              </h3>
            </div>

            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <MailOutlineIcon />
                Email: <span>james@gmail.com</span>
              </p>
              <p className="mt-3">
                <CreditCardIcon />
                Número NIS: <span>12312312</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FuncionarioView
