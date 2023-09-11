import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import styles from './home.style';

const log = console.log;

const Home = () => {
  const [salBasic, setSalBasic] = useState('');
  const [usdToLkr, setUsdToLkr] = useState('300');
  const [salTakeHome, setSalTakeHome] = useState(0);
  const [epf, setEpf] = useState(0);
  const [etf, setEtf] = useState(0);
  const [tax, setTax] = useState(0);
  const [companyTotal, setCompanyTotal] = useState(0);
  const [salTakeHomeInUSD, setSalTakeHomeInUSD] = useState(0);

  const currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const calculateTax = (salBasic) => {
    let tax6 = 0;
    let tax12 = 0;
    let tax18 = 0;
    let tax24 = 0;
    let tax30 = 0;
    let tax36 = 0;
    const taxFreeAmount = 1200000;
    const taxBlockSize = 500000;

    const salAnnual = salBasic * 12;

    // first 12 laks free from tax
    if (salAnnual > taxFreeAmount) {
      let taxableAmount = salAnnual - taxFreeAmount;

      // calculate 6% quota
      if (taxableAmount > taxBlockSize) {
        tax6 = taxBlockSize*0.06;

        taxableAmount = taxableAmount - taxBlockSize; // taxable for 12%

        if (taxableAmount > taxBlockSize) {
          tax12 = taxBlockSize*0.12;

          taxableAmount = taxableAmount - taxBlockSize; // taxable for 18%

          if (taxableAmount > taxBlockSize) {
            tax18 = taxBlockSize*0.18;

            taxableAmount = taxableAmount - taxBlockSize; // taxable for 24%

            if (taxableAmount > taxBlockSize) {
              tax24 = taxBlockSize*0.24;

              taxableAmount = taxableAmount - taxBlockSize; // taxable for 30%
             
              if (taxableAmount > taxBlockSize) {
                tax30 = taxBlockSize*0.30;

                taxableAmount = taxableAmount - taxBlockSize; // taxable for 36%

                tax36 = taxableAmount*0.36;
              } else {
                tax30 = taxableAmount*0.30;
              }
            } else {
              tax24 = taxableAmount*0.24;
            }
          } else {
            tax18 = taxableAmount*0.18;
          }
        } else {
          tax12 = taxableAmount*0.12;
        }
      } else {
        tax6 = taxableAmount*0.06;
      }
    }

    return (tax6 + tax12 + tax18 + tax24 + tax30 + tax36)/12;
  }

  const handleCalculation = (amount) => {
    // monthly basic salary
    const amountInt = parseInt(amount, 10);

    if (isNaN(amountInt)) {
      setSalBasic('');
      setEpf(0);
      setEtf(0);
      setSalTakeHome(0);
      setSalTakeHomeInUSD(0);
      setCompanyTotal(0);

      return;
    }

    // tax per month
    const tax = calculateTax(amountInt);

    // EPF from employee
    const epfFromEmployee = amountInt*0.08;

    // EPF from employer
    const epfFromEmployer = amountInt*0.12;

    // ETF
    const etf = amountInt*0.03;

    // Takehome in LKR
    const takeHomeinLKR = amountInt - tax - epfFromEmployee;

    // LKR to USD
    const usdAmount = usdToLkr && takeHomeinLKR/usdToLkr;

    setSalBasic(amountInt);
    setEpf(epfFromEmployee);
    setEtf(etf);
    setTax(tax);
    setCompanyTotal(amountInt + epfFromEmployer + etf);
    setSalTakeHome(takeHomeinLKR);
    setSalTakeHomeInUSD(usdAmount || 0);
  };

  // currency rate handler
  const handleUsdChange = (amount) => {
    const usdToLkrRate = parseInt(amount, 10);

    if (isNaN(usdToLkrRate)) {
      setUsdToLkr('');
      setSalTakeHomeInUSD(0);
      return;
    }

    const takeHomeInUsd = salTakeHome/usdToLkrRate;
    setSalTakeHomeInUSD(takeHomeInUsd);
    setUsdToLkr(usdToLkrRate);
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Salary Calculator</Text>
      </View>
      <View style={styles.salContainer}>
        <View style={styles.salInputWrapper}>
          <TextInput
            style={styles.salInput}
            keyboardType='numeric'
            value={salBasic.toString() || ''}
            onChangeText={(amount) => handleCalculation(amount)}
            placeholder='Enter your basic salary'
          />
        </View>
        <View style={styles.salInputWrapper}>
            <TextInput
              style={styles.salInput}
              keyboardType='numeric'
              value={usdToLkr.toString()}
              onChangeText={(amnt) => handleUsdChange(amnt)}
              placeholder='LKR to USD Rate'
            />
        </View>
        <View style={styles.salDetails}>
          <Text style={styles.salDetailsText}>Take home: {currencyFormat(salTakeHome)} LKR</Text>
          <Text style={styles.salDetailsText}>Take home: {currencyFormat(salTakeHomeInUSD)} USD</Text>
          <Text style={styles.salDetailsText}>EPF: {currencyFormat(epf)} LKR</Text>
          <Text style={styles.salDetailsText}>ETF: {currencyFormat(etf)} LKR</Text>
          <Text style={styles.salDetailsText}>Tax: {currencyFormat(tax)} LKR</Text>
          <Text style={styles.salDetailsText}>Company Total: {currencyFormat(companyTotal)} LKR</Text>
        </View>
      </View>
    </View>
  )
};

export default Home;
