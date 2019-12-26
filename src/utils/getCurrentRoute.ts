const getCurrentRoute: () => string = () => location.hash.split("#")[1] || "";
export default getCurrentRoute;
