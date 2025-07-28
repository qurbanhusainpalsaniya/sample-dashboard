const scrollAndFocusOnError = (errors) => {
    if (errors && Object.keys(errors).length > 0) {
        const firstErrorField = Object.keys(errors)[0];
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
};
export default scrollAndFocusOnError