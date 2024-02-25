const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: "7b836c1f-46c2-496f-8e87-75ae6511c411",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const getDataUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const addCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "7b836c1f-46c2-496f-8e87-75ae6511c411",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const updateUser = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "7b836c1f-46c2-496f-8e87-75ae6511c411",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const removeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "7b836c1f-46c2-496f-8e87-75ae6511c411",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const addLike = (id, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      authorization: "7b836c1f-46c2-496f-8e87-75ae6511c411",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const updateAvatar = (data) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-6/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "7b836c1f-46c2-496f-8e87-75ae6511c411",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};
