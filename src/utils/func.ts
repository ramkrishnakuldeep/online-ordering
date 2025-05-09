export const getFormattedNumber = (num: number) => {
    return new Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(num)
}

export const generateOrderNumber = (): string => {
    return new Date().getTime().toString()
}