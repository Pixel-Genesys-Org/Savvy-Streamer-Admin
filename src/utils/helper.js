import dayjs from "dayjs"

const colors = [
    "bg-red-100 text-red-800",
    "bg-yellow-100 text-yellow-800",
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-orange-100 text-orange-800",
    "bg-lime-100 text-lime-800",
    "bg-emerald-100 text-emerald-800",
    "bg-cyan-100 text-cyan-800",
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