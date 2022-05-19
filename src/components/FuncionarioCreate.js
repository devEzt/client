import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import { FormGroup } from 'react-bootstrap'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import api from '../services/api'

const FuncionarioCreate = (props) => {
  const validationSchema = Yup.object({
    nome: Yup.string().min(2, 'Nome Curto!').max(30, 'Muito Longo!').required('Campo Obrigatório'),
    sobrenome: Yup.string().min(2, 'Sobrenome Curto!').max(50, 'Muito Longo!').required('Campo Obrigatório'),
    email: Yup.string().email('Você inseriu um E-mail Inválido!'),
    nnis: Yup.number().positive('Número NIS é inválido').integer('Número NIS é inválido').required('Campo Obrigatório'),
  })

  const navigate = useNavigate()

  const formCriarFuncionario = {
    nome: '',
    sobrenome: '',
    email: '',
    nnis: '',
  }

  const handleOnSubmit = async (values) => {
    const obj = {
      nome: values.nome,
      sobrenome: values.sobrenome,
      email: values.email,
      nnis: values.nnis,
    }

    try {
      const res = await api.post('/add-funcionario', obj)

      if (res.status === 201) {
        toast.success('Funcionário criado com sucesso!!')
        navigate('/')
      }
    } catch (err) {
      toast.error('Algo deu errado!!')
      throw new Error(err)
    }
  }

  return (
    <div className="container mt-4">
      <NavLink to="/">
        <button className="btn btn-primary">
          <HomeIcon />
        </button>
      </NavLink>
      <Formik
        {...props}
        initialValues={props.isEdit ? props.initialValues : formCriarFuncionario}
        validationSchema={validationSchema}
        onSubmit={(values) => (props.isEdit ? props.onSubmit(values) : handleOnSubmit(values))}
      >
        {({ isSubmitting, dirty }) => (
          <Form className="mt-4">
            <div className="row">
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label className="form-label">Nome:</label>
                <FormGroup>
                  <Field
                    id="nome-funcionario"
                    name="nome"
                    minLength="2"
                    maxLength="33"
                    type="text"
                    className="form-control"
                    required
                  />
                  <ErrorMessage name="nome" className="d-block invalid-feedback" component="span" />
                </FormGroup>
              </div>
              <div className="mb-3  col-lg-6 col-md-6 col-12">
                <label className="form-label">Sobrenome:</label>
                <FormGroup>
                  <Field
                    id="sobrenome-funcionario"
                    name="sobrenome"
                    minLength="2"
                    maxLength="56"
                    type="text"
                    className="form-control"
                    required
                  />
                  <ErrorMessage name="sobrenome" className="d-block invalid-feedback" component="span" />
                </FormGroup>
              </div>
              <div className="mb-3  col-lg-6 col-md-6 col-12">
                <label className="form-label">Email:</label>
                <FormGroup>
                  <Field id="email-funcionario" name="email" type="text" className="form-control" required />
                  <ErrorMessage name="email" className="d-block invalid-feedback" component="span" />
                </FormGroup>
                <div id="emailHelp" className="form-text">
                  Lembre-se de não compartilhar seu email com ninguem.
                </div>
              </div>
              <div className="mb-3  col-lg-6 col-md-6 col-12">
                <label className="form-label">Número NIS (PIS):</label>
                <FormGroup>
                  <Field id="nnis-funcionario" name="nnis" type="number" className="form-control" required />
                  <ErrorMessage name="nnis" className="d-block invalid-feedback" component="span" />
                </FormGroup>
              </div>
              <button type="submit" disabled={isSubmitting || !dirty} className="btn btn-primary">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FuncionarioCreate
