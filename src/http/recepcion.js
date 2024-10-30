import { addr, getRequest, patchRequest, postRequest, url } from "./util";

const organizationsLogo = [
  {
    boscara: 'https://storage.googleapis.com/adlt-public/boscara-logo.png'
  },
  {
    ichigo: 'https://storage.googleapis.com/adlt-public/ichigo-logo.png'
  },
  {
    adlt: 'https://storage.googleapis.com/adlt-public/adlt-logo.png'
  }
]

const URL_PREFIX = url("recepcion", "v2")
const SKU_NEWUSER = 'boscara-nuevo-usuario';
const SKU_NEWPASSWORD = 'boscara-cambio-contrasena';

export const fetchScrappedProduct = sku => getRequest(`${URL_PREFIX}/scrapped-products/${sku}`)

export const fetchAppointments = () => getRequest(`${URL_PREFIX}/appointments`)

export const fetchAppointment = (id) => getRequest(`${URL_PREFIX}/appointments/${id}`)

export const confirmAppointment = (id) =>
  patchRequest(`${URL_PREFIX}/appointments`, { id, confirmedAt: new Date().getTime() })


export const cancelAppointment = (id) =>
  patchRequest(`${URL_PREFIX}/appointments`, { id, canceledAt: new Date().getTime() })

export const fetchUsers = () => getRequest(`${URL_PREFIX}/users`)

export const fetchUser = (id) => getRequest(`${URL_PREFIX}/users/${id}`)

export const getOrganizations = (id) => getRequest(`${URL_PREFIX}/organizations`)

export const updateUser = (id, name, email, password, role, organizations) =>
  patchRequest(
    `${URL_PREFIX}/users/${id}`,
    {
      name: name,
      email: email,
      password: password,
      role: role,
      organizations: organizations
    }
  )

export const updateProfileUser = (id, name, email, role, organizations) =>
  patchRequest(
    `${URL_PREFIX}/users/${id}`,
    {
      name: name,
      email: email,
      role: role,
      organizations: organizations
    }
  )

export const createUser = (name, email, password, role, organizations, user) => {
  let logo = '';
  if (organizations && organizations.length > 0) {
    const firstOrg = organizations[0].toLowerCase();
    const matchingLogo = organizationsLogo.find(org =>
      Object.keys(org)[0].toLowerCase() === firstOrg
    );
    if (matchingLogo) {
      logo = Object.values(matchingLogo)[0];
    }
  }

  return postRequest(
    `${URL_PREFIX}/users`,
    {
      name: name,
      email: email,
      password: password,
      role: role,
      organizations: organizations,
      invitedBy: user,
      sku: SKU_NEWUSER,
      logoUrl: logo
    }
  )
}

export const requestPasswordChange = (id, name, email, organizations) => {
  let logo = '';
  if (organizations && organizations.length > 0) {
    const firstOrg = organizations[0].toLowerCase();
    const matchingLogo = organizationsLogo.find(org =>
      Object.keys(org)[0].toLowerCase() === firstOrg
    );
    if (matchingLogo) {
      logo = Object.values(matchingLogo)[0];
    }
  }
  return postRequest(
    `${URL_PREFIX}/users/request-password-change`,
    {
      id: id,
      name: name,
      email: email,
      sku: SKU_NEWPASSWORD,
      logoUrl: logo
    }
  )
}
