class dataValueFormatParser {
    constructor(objectKey, objectValue) {
        this.objectKey = objectKey;
        this.objectValue = objectValue;
    }

    parseValue() {
        switch (this.objectValue.kind) {
            case 'string':
                break;
            case 'number':
                break;
            case 'currency':
                this.objectValue.value = this.objectValue.value.amount;
                this.objectValue.kind = 'number';
                break;
            case 'date':
                this.objectValue.value = new Date(this.objectValue.value).toLocaleDateString('zh-Hans-CN',
                    {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        timeZone: 'UTC',
                    }).replaceAll("/", "-");
                break;
            case 'time':
                //this.objectValue.value = this.objectValue.value.slice(0, -3);
                break;
            case 'array':
                break;
            case 'object':
                break;

            default:
        }
    }
}

class resultParser {
    constructor(model, result) {
        this.model = model;
        this.result = result;
    }

    parseResult() {
        switch (this.model) {
            case 'prebuilt-receipt':
                const receiptImportantKey = {
                    'Total': {
                        'value': '',
                        'kind': 'number'
                    },
                    'TransactionDate': {
                        'value': null,
                        'kind': 'date'
                    },
                    'Items': {
                        'values': [],
                        'kind': 'array'
                    }
                };
                return Object.assign(receiptImportantKey, this.result);
            case 'prebuilt-invoice':
                const invoiceImportantKey = {
                    'Items': {
                        'values': [],
                        'kind': 'array'
                    }
                };
                return Object.assign(invoiceImportantKey, this.result);
            case 'prebuilt-businessCard':
                return this.result;

            default:
                return this.result;
        }
    }
}

export { dataValueFormatParser, resultParser };