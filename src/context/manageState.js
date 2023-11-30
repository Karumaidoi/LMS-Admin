const { createContext, useContext, useReducer } = require("react");
import PropTypes from "prop-types";

const AppState = createContext();

const BASE_URL = "https://tapandgokenya.com/api/v1";

const initialState = {
  user: {},
  emailSent: false,
  isAuthenticated: false,
  matatus: [],
  receipts: [],
  isLoading: false,
  walletLoading: false,
  reqError: "",
  status: false,
  routes: [],
  conductors: [],
  token: "",
  walletBalance: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "walletLoading":
      return { ...state, walletLoading: true };
    case "user/email":
      return { ...state, isLoading: false, emailSent: true, reqError: "" };
    case "user/activated":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        reqError: "",
      };
    case "user/current":
      return {
        ...state,
        user: action.payload.sacco_info,
        walletBalance: action.payload.sacco_info.wallet.balance,
        matatus: action.payload.sacco_info.matatus,
        routes: action.payload.sacco_info.routes,
        conductors: action.payload.sacco_info.conductors,
        isActivated: true,
        isLoading: false,
        reqError: "",
      };

    case "error":
      return {
        ...state,
        isLoading: false,
        reqError: action.payload,
        status: false,
        walletLoading: false,
      };
    default:
      throw new Error("Something went wrong");
  }
}

function AppProvider({ children }) {
  const [
    {
      user,
      isAuthenticated,
      matatus,
      receipts,
      emailSent,
      isLoading,
      reqError,
      conductors,
      routes,
      walletLoading,
      walletBalance,
      status,
    },
    dispatchUser,
  ] = useReducer(reducer, initialState);

  async function logIn(email) {
    dispatchUser({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/auth/sacco/login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ company_email: email }),
      });

      const data = await res.json();

      dispatchUser({ type: "user/email", payload: data.data.sacco_info });

      return data.status;
    } catch (err) {
      dispatchUser({ type: "error", payload: "err" });
    }
  }

  async function activateOTP(otp) {
    dispatchUser({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/auth/sacco/activate`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ otp_code: otp }),
      });

      const data = await res.json();

      sessionStorage.setItem("token", data.data.api.token);
      sessionStorage.setItem("saccoId", data.data.sacco_info.id);
      sessionStorage.setItem("walletNumber", data.data.sacco_info.wallet.wallet_ac_number);

      dispatchUser({ type: "user/activated", payload: data.data });
      return data.status;
    } catch (error) {
      dispatchUser({ type: "error", payload: "" });
    }
  }

  async function getCurrentSacco(accNumber, token) {
    dispatchUser({ type: "loading" });

    try {
      var res = await fetch(`${BASE_URL}/sacco/account/${accNumber}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });

      var data = await res.json();

      dispatchUser({ type: "user/current", payload: data.data });

      sessionStorage.setItem("saccoId", data.data.sacco_info.id);
    } catch (error) {
      dispatchUser({ type: "error", payload: "Someting went wrong" });
    }
  }

  async function registerMatatu(routeId, name, plate) {
    dispatchUser({ type: "loading" });
    const saccoId = sessionStorage.getItem("saccoId");
    const token = sessionStorage.getItem("token");

    try {
      var res = await fetch(`${BASE_URL}/sacco/matatu/add/${saccoId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          route_id: routeId,
          name: name,
          number_plate: plate,
        }),
      });

      var data = await res.json();

      dispatchUser({ type: "matatu/register", payload: data.data.vehicle_registered });

      return data.status;
    } catch (error) {
      dispatchUser({ type: "error", payload: "Someting went wrong" });
    }
  }

  async function registerConductor(matatuId, name, phone, email, terminalNumber) {
    dispatchUser({ type: "loading" });
    const saccoId = sessionStorage.getItem("saccoId");
    const token = sessionStorage.getItem("token");
    try {
      var res = await fetch(`${BASE_URL}/sacco/conductor/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conductor_terminal_serial_number: terminalNumber,
          matatu_id: matatuId,
          first_name: name,
          phone_number: phone,
          email: email,
        }),
      });

      var data = await res.json();

      dispatchUser({
        type: "conductor/register",
        payload: {
          ...data.data.conductor.profile,
          matatu_id: matatuId,
        },
      });

      return data.status;
    } catch (error) {
      dispatchUser({ type: "error", payload: "Someting went wrong" });
    }
  }

  async function getMatatus() {
    dispatchUser({ type: "loading" });
    const saccoId = sessionStorage.getItem("saccoId");
    const token = sessionStorage.getItem("token");
    try {
      var res = await fetch(`${BASE_URL}/sacco/matatu/list/${saccoId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });

      var data = await res.json();

      dispatchUser({ type: "matatu/loaded", payload: data.data.matatus });
    } catch (err) {
      dispatchUser({ type: "error", payload: "Someting went wrong" });
    }
  }

  async function getReports() {
    dispatchUser({ type: "loading" });
    const token = sessionStorage.getItem("token");
    try {
      var res = await fetch(`${BASE_URL}/sacco/reports/general`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });

      var data = await res.json();

      dispatchUser({ type: "sacco/reports", payload: data.data.sacco_transactions });
    } catch (err) {
      dispatchUser({ type: "error", payload: "Someting went wrong" });
    }
  }

  async function getWalletBalance() {
    dispatchUser({ type: "walletLoading" });
    const token = sessionStorage.getItem("token");
    try {
      var res = await fetch(`${BASE_URL}/sacco/account/balance`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });

      var data = await res.json();

      dispatchUser({ type: "wallet/balance", payload: data.data.balance });
      return data.status;
    } catch (error) {
      dispatchUser({ type: "error", payload: "Someting went wrong" });
    } finally {
      dispatchUser({ type: "error", payload: "Someting went wrong" });
    }
  }

  async function logOut() {
    sessionStorage.clear();
    dispatchUser({ type: "user/logout" });
    return true;
  }

  return (
    <AppState.Provider
      value={{
        logIn,
        logOut,
        dispatchUser,
        user,
        isAuthenticated,
        emailSent,
        isLoading,
        activateOTP,
        getCurrentSacco,
        registerMatatu,
        registerConductor,
        reqError,
        getMatatus,
        matatus,
        receipts,
        conductors,
        routes,
        getReports,
        getWalletBalance,
        walletLoading,
        status,
        walletBalance,
      }}
    >
      {children}
    </AppState.Provider>
  );
}

function useAppState() {
  const context = useContext(AppState);
  if (context === undefined) throw new Error("Context used in a wrong Provider");
  return context;
}

export { AppProvider, useAppState };

AppProvider.propTypes = {
  children: PropTypes.element,
};
