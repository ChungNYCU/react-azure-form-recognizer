import React from 'react';
import {useState} from 'react';
import ItemsList from './ItemsList';

const InputHelper = (props) => {

    const data = props.propsData;

    const [MerchantName, setMerchantName] = useState(data.MerchantName.valueString);
    const [MerchantAddress, setMerchantAddress] = useState(data.MerchantAddress.valueString);
    const [MerchantPhoneNumber, setMerchantPhoneNumber] = useState(data.MerchantPhoneNumber.valuePhoneNumber);

    const [TransactionDate, setTransactionDate] = useState(data.TransactionDate.valueDate);
    const [TransactionTime, setTransactionTime] = useState(data.TransactionTime.valueTime);

    const [Subtotal, setSubtotal] = useState(data.Subtotal.valueNumber);
    const [TotalTax, setTotalTax] = useState(data.TotalTax.valueNumber);
    const [Total, setTotal] = useState(data.Total.valueNumber);

    return (
        <div key="fields"> 
            <div key="MerchantName">
                <span>Merchant Name: 
                    <input 
                    key="MerchantNameContent"
                    value={MerchantName}
                    onChange={(e)=>setMerchantName(e.target.value)}
                    />
                </span>
            </div>
            <div key="MerchantAddress">
                <span>Merchant Address: 
                    <input 
                    key="MerchantAddressContent"
                    value={MerchantAddress} 
                    onChange={(e)=>setMerchantAddress(e.target.value)}
                    />
                </span>
            </div>
            <div key="MerchantPhoneNumber">
                <span>Merchant PhoneNumber: 
                    <input 
                    key="MerchantPhoneNumberContent"
                    value={MerchantPhoneNumber} 
                    onChange={(e)=>setMerchantPhoneNumber(e.target.value)}
                    />
                </span>
            </div><br/>
            <div key="TransactionDate">
                <span>TransactionDate: 
                    <input 
                    key="TransactionDateContent"
                    value={TransactionDate} 
                    onChange={(e)=>setTransactionDate(e.target.value)}
                    />
                </span>
            </div>
            <div key="TransactionTime">
                <span>TransactionTime: 
                    <input 
                    key="TransactionTimeContent"
                    value={TransactionTime} 
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
                    value={Subtotal} 
                    onChange={(e)=>setSubtotal(e.target.value)}
                    />
                </span>
            </div>
            <div key="TotalTax">
                <span>TotalTax: 
                    <input 
                    key="TotalTaxContent"
                    value={TotalTax} 
                    onChange={(e)=>setTotalTax(e.target.value)}
                    />
                </span>
            </div>
            <div key="Total">
                <span>Total: 
                    <input 
                    key="TotalContent"
                    value={Total} 
                    onChange={(e)=>setTotal(e.target.value)}
                    />
                </span>
            </div>
        </div>
    )
}

export default InputHelper;
