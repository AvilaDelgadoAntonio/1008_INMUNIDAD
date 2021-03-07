/* Insertar datos en colecciones: VACUNA, PACIENTE, HISTORIAL 
creadas por el propio alumno */

db.vacuna.drop()

db.vacuna.insertMany([

{ cod_vacuna : "vac001",
  nombre_vacuna: "Pfizer",  
  precio_dosis: 22.50,
  nacionalidad: "EEUU"
},{
  cod_vacuna :  "vac002",
  nombre_vacuna: "AstraZeneca",
  precio_dosis: 10.75,
  nacionalidad: "Anglo-Sueca"
},{
  cod_vacuna :  "vac003",
  nombre_vacuna: "PharmaMar",
  precio_dosis: 15,
  nacionalidad: "Española"
},{
  cod_vacuna : "vac004",
  nombre_vacuna: "Sputnik",
  precio_dosis: 27,
  nacionalidad: "Rusa"
},{
  cod_vacuna : "vac005",
  nombre_vacuna: "Johnson&Johnson",
  precio_dosis: 30,
  nacionalidad: "EEUU"
},{
  cod_vacuna : "vac006",
  nombre_vacuna: "MSD",
  precio_dosis: 20.75,
  nacionalidad: "Española"
},{
  cod_vacuna : "vac007",
  nombre_vacuna: "Novartis",
  precio_dosis:  25.50,
  nacionalidad: "Suiza"
},{
  cod_vacuna : "vac008",
  nombre_vacuna: "Bayer",
  precio_dosis:  48.50,
  nacionalidad: "Alemana"
},{
  cod_vacuna : "vac009",
  nombre_vacuna: "Sinopharm",
  precio_dosis:  50.50,
  nacionalidad: "China"
}
])


db.paciente.drop()

db.paciente.insertMany([

{ cod_paciente : "pacient001",
  fecha_nacimiento: ISODate("1992-02-02T08:00:00Z"),
  nombre_paciente: "Francisco Romero",
  lugar_nacimiento: "Madrid",
  VIP: true
},{
  cod_paciente :  "pacient002",
  fecha_nacimiento: ISODate("1987-05-22T08:00:00Z"),
  nombre_paciente: "Soledad Sanz",
  lugar_nacimiento: "Almeria",
  VIP: false
},{
  cod_paciente : "pacient003",
  fecha_nacimiento: ISODate("1987-03-12T08:00:00Z"),
  nombre_paciente: "Laura Vaz",
  lugar_nacimiento: "Valencia",
  VIP: true
},{
  cod_paciente : "pacient004",
  fecha_nacimiento: ISODate("1969-08-22T08:00:00Z"),
  nombre_paciente: "Manuel Escudero",
  lugar_nacimiento: "Valencia",
  VIP: false
},{
  cod_paciente : "pacient005",
  fecha_nacimiento: ISODate("1987-03-12T08:00:00Z"),
  nombre_paciente: "Sonia Lara",
  lugar_nacimiento: "Madrid",
  VIP: true
},{
  cod_paciente : "pacient006",
  fecha_nacimiento: ISODate("1987-03-12T08:00:00Z"),
  nombre_paciente: "Rodrigo Bernabeu",
  lugar_nacimiento: "Valencia",
  VIP: true
},{
  cod_paciente : "pacient007",
  fecha_nacimiento: ISODate("1987-03-12T08:00:00Z"),
  nombre_paciente: "Felipe Ramos",
  lugar_nacimiento: "Valencia",
  VIP: false
},{
  cod_paciente : "pacient008",
  fecha_nacimiento: ISODate("1987-05-22T08:00:00Z"),
  nombre_paciente: "Martina Klein",
  lugar_nacimiento: "Almeria",
  VIP: false
},{
  cod_paciente : "pacient009",
  fecha_nacimiento: ISODate("1987-05-22T08:00:00Z"),
  nombre_paciente: "Irina Putin",
  lugar_nacimiento: "Moscú",
  VIP: true
}
])

db.historial.drop()

db.historial.insertMany([

{ cod_paciente : "pacient001",
  enfermedades_previas: "Hipocondriaco",
  tratamiento_preexistente: ["Xylishield", "Lipitor", "Zocor"],
  tratamiento_dosis_mg: 3.75,
  sangre: { tipo: "A", factor_RH:"positivo"},
  detalle_vacuna: 
[
  {cod_vacuna : "vac001", "dosis_recibidas":2},
  {cod_vacuna : "vac008", "dosis_recibidas":1},
  {cod_vacuna : "vac009", "dosis_recibidas":1}
]
},{
  cod_paciente :  "pacient002",
  enfermedades_previas: "hipocondriaco",
  tratamiento_preexistente: ["NITRON", "Ximiil", "Aspirina", "Paracetamol", "Sintron"],
  tratamiento_dosis_mg: 200,
  sangre: { tipo: "0", factor_RH:"positivo"},
  detalle_vacuna: 
[
  {cod_vacuna : "vac001", "dosis_recibidas":2},
  {cod_vacuna : "vac004", "dosis_recibidas":2}
]
},{
  cod_paciente : "pacient003",
  enfermedades_previas: "ictus",
  tratamiento_preexistente: ["Lipitor", "Zocor", "Paracetamol", "Xylishield"],
  tratamiento_dosis_mg: 1.25,
  sangre: { tipo: "A", factor_RH:"negativo"},
  detalle_vacuna: 
[
  {cod_vacuna : "vac002", "dosis_recibidas":1},
  {cod_vacuna : "vac004", "dosis_recibidas":1},
  {cod_vacuna : "vac009", "dosis_recibidas":2}
]
},{
  cod_paciente : "pacient004",
    enfermedades_previas: "hipocondriaco",
  tratamiento_preexistente: ["NITRON", "Sintron"],
  tratamiento_dosis_mg: 200,
  sangre: { tipo: "B", factor_RH:"positivo"},
  detalle_vacuna: 
[
  {cod_vacuna : "vac001", "dosis_recibidas":2},
  {cod_vacuna : "vac008", "dosis_recibidas":2}
]
},{
  cod_paciente : "pacient005",
  enfermedades_previas: "Hipertensión",
  tratamiento_preexistente: ["Lipitor", "Zocor"],
  tratamiento_dosis_mg: 3.50,
  sangre: { tipo: "A", factor_RH:"positivo"},
  detalle_vacuna: 
[
  {cod_vacuna : "vac001", "dosis_recibidas":1},
  {cod_vacuna : "vac004", "dosis_recibidas":2},
  {cod_vacuna : "vac007", "dosis_recibidas":1}
]
},{
  cod_paciente : "pacient006",
  enfermedades_previas: "ictus",
  tratamiento_preexistente: ["Paracetamol", "Xylishield"],
  tratamiento_dosis_mg: 2.25,
  sangre: { tipo: "A", factor_RH:"negativo"},
  detalle_vacuna: 
[
  {cod_vacuna : "vac002", "dosis_recibidas":1},
  {cod_vacuna : "vac007", "dosis_recibidas":1},
  {cod_vacuna : "vac009", "dosis_recibidas":2}
]
},{
  cod_paciente : "pacient007",
  enfermedades_previas: "diabetes",
  tratamiento_preexistente: ["Zocor", "Paracetamol"],
  tratamiento_dosis_mg: 3.25,
  sangre: { tipo: "AB", factor_RH:"positivo"},
  detalle_vacuna: 
[
  {cod_vacuna : "vac001", "dosis_recibidas":1},
  {cod_vacuna : "vac004", "dosis_recibidas":2},
  {cod_vacuna : "vac009", "dosis_recibidas":1}
]
},{
  cod_paciente : "pacient008",
  enfermedades_previas: "Malaria",
  tratamiento_preexistente: ["Xylishield", "Zocor"],
  tratamiento_dosis_mg: 1.75,
  sangre: { tipo: "A", factor_RH:"positivo"},
  detalle_vacuna: 
[
  {cod_vacuna : "vac001", "dosis_recibidas":2},
  {cod_vacuna : "vac004", "dosis_recibidas":2}
]
},{
  cod_paciente : "pacient009",
  enfermedades_previas: "hepatitis",
  tratamiento_preexistente: ["Paracetamol", "Xylishield"],
  tratamiento_dosis_mg: 2.25,
  sangre: { tipo: "A", factor_RH:"negativo"},
  detalle_vacuna: 
[
  {cod_vacuna : "vac005", "dosis_recibidas":0},
  {cod_vacuna : "vac004", "dosis_recibidas":4}
]
}
])