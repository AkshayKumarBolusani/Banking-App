export type Account = {
  id: string;
  name: string;
  balance: number;
  type: string;
  status: 'active' | 'inactive';
};

export function createAccount(name: string, balance: number): Account {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    balance,
    type: '',
    status: 'active',
  };
}

export function deposit(account: Account, amount: number): Account {
  return { ...account, balance: account.balance + amount };
}

export function withdraw(account: Account, amount: number): Account {
  return { ...account, balance: account.balance - amount };
}

export function transfer(
  from: Account,
  to: Account,
  amount: number
): { from: Account; to: Account } {
  return {
    from: { ...from, balance: from.balance - amount },
    to: { ...to, balance: to.balance + amount },
  };
} 