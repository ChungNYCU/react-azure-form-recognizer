import React from 'react';
import {useState} from 'react';
import ItemsList from './ItemsList';

const FormRecognizerReceiptInput = (props) => {

    const data = props.propsData;

    const [merchantName, setMerchantName] = useState(data.MerchantName.valueString);
    const [merchantAddress, setMerchantAddress] = useState(data.MerchantAddress.valueString);
    const [merchantPhoneNumber, setMerchantPhoneNumber] = useState(data.MerchantPhoneNumber.valuePhoneNumber);

    const [transactionDate, setTransactionDate] = useState(data.TransactionDate.valueDate);
    const [transactionTime, setTransactionTime] = useState(data.TransactionTime.valueTime);

    const [subtotal, setSubtotal] = useState(data.Subtotal.valueNumber);
    const [totalTax, setTotalTax] = useState(data.TotalTax.valueNumber);
    const [total, setTotal] = useState(data.Total.valueNumber);

    data.MerchantName.valueString = merchantName;
    data.MerchantAddress.valueString = merchantAddress;
    data.MerchantPhoneNumber.valuePhoneNumber = merchantPhoneNumber;

    data.TransactionDate.valueDate = transactionDate;
    data.TransactionTime.valueTime = transactionTime;

    data.Subtotal.valueNumber = subtotal;
    data.TotalTax.valueNumber = totalTax;
    data.Total.valueNumber = total;

    return (
        <div key="fields"> 
            <div key="MerchantName">
                <span>Merchant Name: 
                    <input 
                    key="MerchantNameContent"
                    value={merchantName}
                    onChange={(e)=>setMerchantName(e.target.value)}
                    />
                </span>
            </div>
            <div key="MerchantAddress">
                <span>Merchant Address: 
                    <input 
                    key="MerchantAddressContent"
                    value={merchantAddress} 
                    onChange={(e)=>setMerchantAddress(e.target.value)}
                    />
                </span>
            </div>
            <div key="MerchantPhoneNumber">
                <span>Merchant PhoneNumber: 
                    <input 
                    key="MerchantPhoneNumberContent"
                    value={merchantPhoneNumber} 
                    onChange={(e)=>setMerchantPhoneNumber(e.target.value)}
                    />
                </span>
            </div><br/>
            <div key="TransactionDate">
                <span>TransactionDate: 
                    <input 
                    key="TransactionDateContent"
                    value={transactionDate} 
                    onChange={(e)=>setTransactionDate(e.target.value)}
                    />
                </span>
            </div>
            <div key="TransactionTime">
                <span>TransactionTime: 
                    <input 
                    key="TransactionTimeContent"
                    value={transactionTime} 
                    onChange={(e)=>setTransactionTime(e.target.value)}
                    />
                </span>
            </div><br/>
            <div key="Items">
            {data.Items.valueArray.map((itemDetail, index) => (
                <ItemsList item={itemDetail.valueObject} key={index}/>
            ))}
            </div><br/>
            <div key="Subtotal">
                <span>Subtotal: 
                    <input 
                    key="SubtotalContent"
                    value={subtotal} 
                    onChange={(e)=>setSubtotal(e.target.value)}
                    />
                </span>
            </div>
            <div key="TotalTax">
                <span>TotalTax: 
                    <input 
                    key="TotalTaxContent"
                    value={totalTax} 
                    onChange={(e)=>setTotalTax(e.target.value)}
                    />
                </span>
            </div>
            <div key="Total">
                <span>Total: 
                    <input 
                    key="TotalContent"
                    value={total} 
                    onChange={(e)=>setTotal(e.target.value)}
                    />
                </span>
            </div>
        </div>
    )
}

export default FormRecognizerReceiptInput;
