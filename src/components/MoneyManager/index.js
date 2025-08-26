import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].optionId,
    transactions: [],
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state

    if (titleInput !== '' && amountInput !== '') {
      const newTransaction = {
        id: uuidv4(),
        title: titleInput,
        amount: parseInt(amountInput),
        type: typeInput,
      }

      this.setState(prevState => ({
        transactions: [...prevState.transactions, newTransaction],
        titleInput: '',
        amountInput: '',
        typeInput: transactionTypeOptions[0].optionId,
      }))
    }
  }

  onDeleteTransaction = id => {
    this.setState(prevState => ({
      transactions: prevState.transactions.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    }))
  }

  getIncome = () => {
    const {transactions} = this.state
    let income = 0
    transactions.forEach(each => {
      if (each.type === 'INCOME') {
        income += each.amount
      }
    })
    return income
  }

  getExpenses = () => {
    const {transactions} = this.state
    let expenses = 0
    transactions.forEach(each => {
      if (each.type === 'EXPENSES') {
        expenses += each.amount
      }
    })
    return expenses
  }

  getBalance = () => {
    const income = this.getIncome()
    const expenses = this.getExpenses()
    return income - expenses
  }

  render() {
    const {titleInput, amountInput, typeInput, transactions} = this.state
    const balance = this.getBalance()
    const income = this.getIncome()
    const expenses = this.getExpenses()

    return (
      <div className="app-container">
        <div className="header">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your{' '}
            <span className="highlight">Money Manager</span>
          </p>
        </div>

        <MoneyDetails balance={balance} income={income} expenses={expenses} />

        <div className="transaction-section">
          <form className="form" onSubmit={this.onAddTransaction}>
            <h1>Add Transaction</h1>

            <label htmlFor="titleInput">TITLE</label>
            <input
              id="titleInput"
              type="text"
              value={titleInput}
              onChange={e => this.setState({titleInput: e.target.value})}
              placeholder="TITLE"
              required
            />

            <label htmlFor="amountInput">AMOUNT</label>
            <input
              id="amountInput"
              type="text"
              value={amountInput}
              onChange={e => this.setState({amountInput: e.target.value})}
              placeholder="AMOUNT"
              required
            />

            <label htmlFor="typeSelect">TYPE</label>
            <select
              id="typeSelect"
              value={typeInput}
              onChange={e => this.setState({typeInput: e.target.value})}
            >
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>

            <button type="submit">Add</button>
          </form>

          <div className="history">
            <h1>History</h1>
            <ul>
              <li className="history-header">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
                <p>Delete</p>
              </li>
              {transactions.map(each => (
                <TransactionItem
                  key={each.id}
                  transaction={each}
                  deleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
