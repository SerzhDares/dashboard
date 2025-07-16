export const agesGroup = (usersData: [{ age: number }]) => {
    return [
      {
          category: '< 21',
          quantity: usersData.filter(data => data.age < 21).length
      },
      {
          category: '21-30',
          quantity: usersData.filter(data => data.age >= 21 && data.age < 31).length
      },
      {
          category: '31-40',
          quantity: usersData.filter(data => data.age >= 31 && data.age < 41).length
      },
      {
          category: '41-50',
          quantity: usersData.filter(data => data.age >= 41 && data.age < 51).length
      },
      {
          category: '51-60',
          quantity: usersData.filter(data => data.age >= 51 && data.age < 61).length
      },
      {
          category: '61-70',
          quantity: usersData.filter(data => data.age >= 61 && data.age < 71).length
      },
      {
          category: '71-80',
          quantity: usersData.filter(data => data.age >= 71 && data.age < 81).length
      },
      {
          category: '81-90',
          quantity: usersData.filter(data => data.age >= 81 && data.age < 91).length
      },
      {
          category: '> 90',
          quantity: usersData.filter(data => data.age >= 91).length
      }
  ]
}