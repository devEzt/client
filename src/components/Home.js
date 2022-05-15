import React from 'react'

const Home = () => {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2">
          <button className="btn btn-primary">Add Funcionario</button>
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
            <tr>
              <th scope="row">1</th>
              <td>James</td>
              <td>Bond</td>
              <td>james@gmail.com</td>
              <td>12312312312</td>
              <td className="d-flex justify-content-between">
                <button className="btn btn-success">read</button>
                <button className="btn btn-primary">update</button>
                <button className="btn btn-danger">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
