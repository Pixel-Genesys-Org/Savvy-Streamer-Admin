import dayjs from "dayjs"

const colors = [
    "bg-red-500/20 text-red-300",
    "bg-yellow-500/20 text-yellow-300",
    "bg-green-500/20 text-green-300",
    "bg-blue-500/20 text-blue-300",
    "bg-purple-500/20 text-purple-300",
    "bg-pink-500/20 text-pink-300",
    "bg-orange-500/20 text-orange-300",
    "bg-lime-500/20 text-lime-300",
    "bg-emerald-500/20 text-emerald-300",
    "bg-cyan/20 text-cyan",
]

const hideEmail = email => email.replace(/(\w)(\w+)(\w)(@.*)/, (_, a, b, c, d) => a + '*'.repeat(b.length) + c + d)

const getInitialDetails = (name = "") => {

    if (!name) return null

    const names = name.trim().split(" ")
    let initials

    if (names.length === 1) {
        initials = names[0][0]?.toUpperCase()
    } else {
        initials = `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }

    let hash = 0

    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % colors.length
    const theme = colors[index]

    return {
        initials,
        theme
    }
}

const dateFormatter = (date, options = { time: true }) => {

    if (date) {

        let format = "MMM DD, YYYY hh:mm a"

        if (!options?.time) {
            format = "MMM DD, YYYY"
        }

        let formatted_date = dayjs(date).format(format)
        return formatted_date
    }

    return null

}

const getNestedValue = (obj, path) => {

    if (path) {
        return path
            .replace(/\[(\w+)\]/g, '.$1')
            .replace(/^\./, '')
            .split('.')
            .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj)
    }

    return null

};

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

const objectToFormData = (obj, form = new FormData(), namespace = "") => {
    Object.entries(obj).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") return;

        const formKey = namespace ? `${namespace}[${key}]` : key;

        if (value instanceof File || value instanceof Blob) {
            form.append(formKey, value);
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                const arrayKey = `${formKey}[${index}]`;

                if (item === null || item === undefined || item === "") return;

                if (item instanceof File || item instanceof Blob) {
                    form.append(arrayKey, item);
                } else if (typeof item === "object" && !(item instanceof Date)) {
                    objectToFormData(item, form, arrayKey);
                } else {
                    form.append(arrayKey, item);
                }
            });
        } else if (typeof value === "object" && !(value instanceof Date)) {
            objectToFormData(value, form, formKey);
        } else {
            form.append(formKey, value);
        }
    });

    return form;
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount).replace("$", "$ ");
}

const calculateAge = (dob) => {

    if (!dob) return null

    const birth_date = new Date(dob)
    const today = new Date()

    let age = today.getFullYear() - birth_date.getFullYear()
    const month_diff = today.getMonth() - birth_date.getMonth()

    if (
        month_diff < 0 ||
        (month_diff === 0 && today.getDate() < birth_date.getDate())
    ) {
        age--
    }

    return age
}

export {
    hideEmail,
    getInitialDetails,
    dateFormatter,
    getNestedValue,
    getGreeting,
    objectToFormData,
    formatCurrency,
    calculateAge
}