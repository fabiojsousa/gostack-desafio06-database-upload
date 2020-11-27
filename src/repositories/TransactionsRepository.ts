import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    let income = 0;
    let outcome = 0;
    let total = 0;

    const allTransactions = await this.find();

    allTransactions.forEach(transaction => {
      const { value, type } = transaction;

      if (type === 'income') income += Number(value);
      else if (type === 'outcome') outcome += Number(value);
    });

    total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
