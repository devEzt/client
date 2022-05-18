import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FuncionarioCreate from './FuncionarioCreate'
import { toast } from 'react-toastify'

import api from '../services/api'

const FuncionarioEdit = () => {
  const [userToEdit, setUserToEdit] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams('')

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

  const handleEditSubmit = async (values) => {
    try {
      const res = await api.patch(`/edit-funcionario/${values._id}`, values)

      if (res.status === 200) {
        toast.success('Funcionário Editado com sucesso!!')
        navigate('/')
      }
    } catch (err) {
      toast.error('Algo deu errado!!')
      throw new Error(err)
    }
  }

  return isLoading ? (
    <div>Está carregando...</div>
  ) : (
    <FuncionarioCreate isEdit initialValues={userToEdit} onSubmit={handleEditSubmit} enableReinitialize />
  )
}

export default FuncionarioEdit
