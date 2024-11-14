import requests, json

#------------------------- LOGIN ESTUDIANTES (PARA PROBAR, DOS CASOS) -------------------------
laData = {'ID': 'LOGINE', 'CNRODOC': '71721662',
          'CCLAVE': '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2'}
response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
laData = json.loads(response.text)
print(laData)

# SHA512 HEX

#--------------------- LOGIN USUARIOS ----------------------------------
# laData = {'ID': 'LOGINUSU',
#           'CNRODNI': '29244573',
#           'CCLAVE': '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2'
#          }
# response = requests.post('https://transacciones.ucsm.edu.pe/wsPython/ERP', json=laData)
# laData = json.loads(response.text)
# print(laData)