export const fromatCurrency = (number: number) => {
    const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
        currency: "USD",
        style: 'currency',
    })
    return CURRENCY_FORMATTER.format(number)
}