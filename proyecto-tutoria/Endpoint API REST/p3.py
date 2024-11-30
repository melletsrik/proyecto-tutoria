import requests, json

#------------------------------------- LOGIN DE ESTUDIANTES ------------------------------------
# CNRODOC puede ser DNI o Codigo de estudiante
# laData = {'ID': 'LOGINE', 'CNRODOC': '2016602871', 
#          'CCLAVE': '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(response.text)
# print(laData)


# ------------------------------------ TUTORIA ------------------------------------------


# Init solicitud de tutoria
# laData = {'ID': 'TUT1010', 'CCODALU': '2022201602'}
# #lcRespon = requests.post('http://127.0.0.1:8000', json = laData)
# lcRespon = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json = laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Solicitar tutoria
# laData = {'ID': 'TUT1011', 'CCODALU': '2022201602', 'CCODDOC': '1221', 'MCONSUL': '¿Cómo hago para hacer una pasantía?', 'CTIPO': 'H', 'CUNIACA': '71'}
# #lcRespon = requests.post('http://127.0.0.1:8000', json = laData)
# lcRespon = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json = laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# # Buscar tutor
# laData = {'ID': 'TUT1012', 'CBUSQUE': '71721662', 'CUNIACA': '71'}
# laData = {'ID': 'TUT1012', 'CBUSQUE': 'PAREDES MARCHENA', 'CUNIACA': '71'}
# #lcRespon = requests.post('http://127.0.0.1:8000', json = laData)
# lcRespon = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json = laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Init respuesta tutoria de docente
# laData = {'ID': 'TUT1020', 'CUSUCOD': '1221'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Consultar tutoria de docente
# laData = {'ID': 'TUT1021', 'CUSUCOD': '1221', 'CIDTUTO': '00001'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Responder tutoria de docente
# laData = {'ID': 'TUT1022', 'CUSUCOD': '1221', 'MRESPUE': 'porque no estudiaste la teoría', 'CIDTUTO': '00003'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Init registrar tutoria por docente
# laData = {'ID': 'TUT1030', 'CUSUCOD': '1221'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Registrar tutoria por docente
# laData = {'ID': 'TUT1031', 'CCODALU': '2021916902', 'CUSUCOD': '1220', 'MCONSUL': '¿Por qué desaprobé el curso?', 'MRESPUE': 'porque no presentaste tu tarea', 'CTIPO': 'A', 'CSOLICI': 'D', 'CUNIACA': '71'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Init calificacion estudiante Tutoria especifica
# laData = {'ID': 'TUT1040', 'CCODALU': '2022201602'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Consulta calificacion estudiante Tutoria especifica 
# laData = {'ID': 'TUT1041', 'CCODALU': '2022201602', 'CIDTUTO': '00002'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Calificar estudiante la tutoria Tutoria especifica
laData = {'ID': 'TUT1042', 'CCODALU': '2021225301', 'CIDTUTO': '00009', 'NCALIFI': 5}
lcRespon = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
laData = json.loads(lcRespon.text)
print(laData)

# Init registrar tutoria general
# laData = {'ID': 'TUT1050', 'CUSUCOD': '1221'}
# lcRespon = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Registrar tutoria general
# laData = {'ID': 'TUT1051', 'CUSUCOD': '1221', 'CUNIACA': '71', 'MRESPUE': 'TUTORIA GENERAL...'}
# lcRespon = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Init Calificar Tutoria general
# laData = {'ID': 'TUT1060', 'CCODALU': '2016602871', 'CNRODNI': '72978577', 'CTOKEN': 'QY0GWW5LVU'}
# lcRespon = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Calificar tutoria general estudiante
# laData = {'ID': 'TUT1061', 'CCODALU': '2016100861', 'CIDTUTO': '00007', 'NCALIFI': 3, 'CNRODNI': '71721662', 'CTOKEN': '1111111111'}
# lcRespon = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Init cerrar tutoria general
# laData = {'ID': 'TUT1070', 'CUSUCOD': '1221'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)

# Cerrar tutoria general
# laData = {'ID': 'TUT1071', 'CUSUCOD': '1221', 'CIDTUTO': '00001'}
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(lcRespon.text)
# print(laData)
