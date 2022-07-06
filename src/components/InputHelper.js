import React, {Component} from 'react';
import { useState, useEffect } from 'react';
import PostData from '../data/receipt_sample_json.json';

const InputHelper = () => {

    const data = PostData.analyzeResult.documents[0].fields;

    const [MerchantName, setMerchantName] = useState("");
    const [MerchantAddress, setMerchantAddress] = useState("");
    const [MerchantPhoneNumber, setMerchantPhoneNumber] = useState("");

    const [TransactionDate, setTransactionDate] = useState("");
    const [TransactionTime, setTransactionTime] = useState("");

    const [Subtotal, setSubtotal] = useState("");
    const [TotalTax, setTotalTax] = useState("");
    const [Total, setTotal] = useState("");

    const [Description, setDescription] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [TotalPrice, setTotalPrice] = useState("");

    return (
        <div key="fields"> 
            <div key="MerchantName">
                <span>Merchant Name: 
                    <input 
                    key={"MerchantNameContent"}
                    value={data.MerchantName.content} 
                    onChange={(e)=>setMerchantName(e.target.value)}
                    />
                </span>
            </div>
            <div key="MerchantAddress">
                <span>Merchant Address: 
                    <input 
                    key={"MerchantAddressContent"}
                    value={data.MerchantAddress.content} 
                    onChange={(e)=>setMerchantAddress(e.target.value)}
                    />
                </span>
            </div>
            <div key="MerchantPhoneNumber">
                <span>Merchant PhoneNumber: 
                    <input 
                    key={"MerchantPhoneNumberContent"}
                    value={data.MerchantPhoneNumber.content} 
                    onChange={(e)=>setMerchantPhoneNumber(e.target.value)}
                    />
                </span>
            </div><br/>
            <div key="TransactionDate">
                <span>TransactionDate: 
                    <input 
                    key={"TransactionDateContent"}
                    value={data.TransactionDate.content} 
                    onChange={(e)=>setTransactionDate(e.target.value)}
                    />
                </span>
            </div>
            <div key="TransactionTime">
                <span>TransactionTime: 
                    <input 
                    key={"TransactionTimeContent"}
                    value={data.TransactionTime.content} 
                    onChange={(e)=>setTransactionTime(e.target.value)}
                    />
                </span>
            </div><br/>
            <div key="Items">
            {data.Items.valueArray.map((itemDetail, index) => {
                return <div key={"ItemsValueArray"+String(index)}>
                    <span>Description: 
                        <input 
                        key={"Description"+String(index)}
                        value={itemDetail.valueObject.Description.content} 
                        onChange={(e)=>setDescription(e.target.value)}
                        />
                    </span><br/>
                    <span>Quantity: 
                        <input
                        key={"Quantity"+String(index)}
                        value={itemDetail.valueObject.Quantity.content} 
                        onChange={(e)=>setQuantity(e.target.value)}
                        />
                    </span><br/>
                    <span>TotalPrice: 
                        <input 
                        key={"TotalPrice"+String(index)}
                        value={itemDetail.valueObject.TotalPrice.content} 
                        onChange={(e)=>setTotalPrice(e.target.value)}
                        />
                    </span><br/>
                </div>
            })}
            </div><br/>
            <div key="Subtotal">
                <span>Subtotal: 
                    <input 
                    key={"SubtotalContent"}
                    value={data.Subtotal.content} 
                    onChange={(e)=>setSubtotal(e.target.value)}
                    />
                </span>
            </div>
            <div key="TotalTax">
                <span>TotalTax: 
                    <input 
                    key={"TotalTaxContent"}
                    value={data.TotalTax.content} 
                    onChange={(e)=>setTotalTax(e.target.value)}
                    />
                </span>
            </div>
            <div key="Total">
                <span>Total: 
                    <input 
                    key={"TotalContent"}
                    value={data.Total.content} 
                    onChange={(e)=>setTotal(e.target.value)}
                    />
                </span>
            </div>
        </div>
    )
}

export default InputHelper;
