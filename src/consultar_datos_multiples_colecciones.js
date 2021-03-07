/*Unir 2 colecciones*/

db.historial.aggregate(
    [
        {
            $lookup: {
                from: "vacuna",
                localField: "detalle_vacuna.cod_vacuna",
                foreignField: "cod_vacuna",
                as: "vacuna_recibida"
            }
        },
        {
            $project: {
                _id: 0,
                "cod_paciente": 1,
                "detalle_vacuna.cod_vacuna": 1,
                "detalle_vacuna.dosis_recibidas": 1,
                "vacuna_recibida.nombre_vacuna": 1,
                "vacuna_recibida.nacionalidad": 1,
                "vacuna_recibida.precio_dosis": 1
            }
        }
    ]
).pretty()

/*Unir más de 2 colecciones*/

db.historial.aggregate(
    [
        {
            $lookup: {
                from: "vacuna",
                localField: "detalle_vacuna.cod_vacuna",
                foreignField: "cod_vacuna",
                as: "vacuna_recibida"
            }
        },
       {
            $lookup: {
                from: "paciente",
                localField: "cod_paciente",
                foreignField: "cod_paciente",
                as: "paciente_vacunado"
            }
        },

        {
            $project: {
                _id: 0,
                "cod_paciente": 1,
                "detalle_vacuna.cod_vacuna": 1,
                "detalle_vacuna.dosis_recibidas": 1,
                "vacuna_recibida.nombre_vacuna": 1,
                "vacuna_recibida.nacionalidad": 1,
                "vacuna_recibida.precio_dosis": 1,
                "paciente_vacunado.nombre_paciente": 1,
                "paciente_vacunado.fecha_nacimiento": 1,
                "paciente_vacunado.lugar_nacimiento": 1,
            }
        }
    ]
).pretty()

/*$unwind para dosis por vacunas-paciente, y $group, para ASEGURARSE que han recibido 4 dosis todos*/

db.historial.aggregate(
   [  
    {
        $unwind: "$detalle_vacuna"
    },
        {
            $lookup: {
                from: "vacuna",
                localField: "detalle_vacuna.cod_vacuna",
                foreignField: "cod_vacuna",
                as: "vacuna_recibida"
            }
        }, 

       {
            $lookup: {
                from: "paciente",
                localField: "cod_paciente",
                foreignField: "cod_paciente",
                as: "paciente_vacunado"
            }
        },

        {
            $project: {
                _id: 0,
                "cod_paciente": 1,
                "detalle_vacuna.dosis_recibidas": 1,
                "paciente_vacunado.nombre_paciente": 1,
            }
        },
 {
        $group: {
            _id: "$paciente_vacunado.nombre_paciente",
            "total_dosis_recibidas": { $sum: "$detalle_vacuna.dosis_recibidas" }
 }
}
    ]
).pretty()


/*$unwind, para tener coste por vacuna, de cada paciente, por separado (datos provienen de múltiles colecciones)*/

db.historial.aggregate(
  [
    {
        $unwind: "$detalle_vacuna"
    },
        {
            $lookup: {
                from: "vacuna",
                localField: "detalle_vacuna.cod_vacuna",
                foreignField: "cod_vacuna",
                as: "vacuna_recibida"
            }
        },
 {
            $lookup: {
                from: "paciente",
                localField: "cod_paciente",
                foreignField: "cod_paciente",
                as: "paciente_vacunado"
            }
        },
        {
            $set: {
                precio_cada_dosis: {$arrayElemAt: ["$vacuna_recibida",0]}
            }
        },

        {
            $project: {
                _id: 0,
                "cod_paciente": 1,
                "detalle_vacuna.cod_vacuna": 1,
                "detalle_vacuna.dosis_recibidas": 1,
                "vacuna_recibida.nombre_vacuna": 1,
                "vacuna_recibida.nacionalidad": 1,
                "vacuna_recibida.precio_dosis": 1,
                "paciente_vacunado.nombre_paciente": 1,
                "paciente_vacunado.fecha_nacimiento": 1,
                "paciente_vacunado.lugar_nacimiento": 1,
                "coste_por_vacuna": {$multiply: 
                   ["$detalle_vacuna.dosis_recibidas", "$precio_cada_dosis.precio_dosis"]}
            }
        }
    ]
).pretty()



/*Con $unwind, coste por vacuna, de cada paciente, por separado
por ello tenemos que usar $group al final 
para obtener suma total del coste de todas vacunas por paciente (ordenado, descendente)*/

db.historial.aggregate(
  [
    {
        $unwind: "$detalle_vacuna"
    },
        {
            $lookup: {
                from: "vacuna",
                localField: "detalle_vacuna.cod_vacuna",
                foreignField: "cod_vacuna",
                as: "vacuna_recibida"
            }
        },
 {
            $lookup: {
                from: "paciente",
                localField: "cod_paciente",
                foreignField: "cod_paciente",
                as: "paciente_vacunado"
            }
        },
        {
            $set: {
                precio_cada_dosis: {$arrayElemAt: ["$vacuna_recibida",0]}
            }
        },

        {
            $project: {
                _id: 0,
                "cod_paciente": 1,
                "detalle_vacuna.cod_vacuna": 1,
                "detalle_vacuna.dosis_recibidas": 1,
                "vacuna_recibida.nombre_vacuna": 1,
                "vacuna_recibida.nacionalidad": 1,
                "vacuna_recibida.precio_dosis": 1,
                "paciente_vacunado.nombre_paciente": 1,
                "paciente_vacunado.fecha_nacimiento": 1,
                "paciente_vacunado.lugar_nacimiento": 1,
                "coste_por_vacuna": {$multiply: 
                   ["$detalle_vacuna.dosis_recibidas", "$precio_cada_dosis.precio_dosis"]}
            }
        },
{
        $group: {
            _id: "$paciente_vacunado.nombre_paciente",
            "total_vacunas": { $sum: "$coste_por_vacuna" }
        }
    },
        {
            $sort: {
                "total_vacunas": -1
            }
        }
    ]
).pretty()

/*Con $unwind, coste por vacuna, de cada paciente, por separado
por ello tenemos que usar $group al final 
para obtener suma total del coste de todas vacunas por paciente (ordenado, descendente),
Y solo los pagos de más de 100*/

db.historial.aggregate(
  [
    {
        $unwind: "$detalle_vacuna"
    },
        {
            $lookup: {
                from: "vacuna",
                localField: "detalle_vacuna.cod_vacuna",
                foreignField: "cod_vacuna",
                as: "vacuna_recibida"
            }
        },
 {
            $lookup: {
                from: "paciente",
                localField: "cod_paciente",
                foreignField: "cod_paciente",
                as: "paciente_vacunado"
            }
        },
        {
            $set: {
                precio_cada_dosis: {$arrayElemAt: ["$vacuna_recibida",0]}
            }
        },

        {
            $project: {
                _id: 0,
                "cod_paciente": 1,
                "detalle_vacuna.cod_vacuna": 1,
                "detalle_vacuna.dosis_recibidas": 1,
                "vacuna_recibida.nombre_vacuna": 1,
                "vacuna_recibida.nacionalidad": 1,
                "vacuna_recibida.precio_dosis": 1,
                "paciente_vacunado.nombre_paciente": 1,
                "paciente_vacunado.fecha_nacimiento": 1,
                "paciente_vacunado.lugar_nacimiento": 1,
                "coste_por_vacuna": {$multiply: 
                   ["$detalle_vacuna.dosis_recibidas", "$precio_cada_dosis.precio_dosis"]}
            }
        },
{
        $group: {
            _id: "$paciente_vacunado.nombre_paciente",
            "total_vacunas": { $sum: "$coste_por_vacuna" }
        }
    },
        {
            $sort: {
                "total_vacunas": -1
            }
        },
  {
            $match: {
               "total_vacunas": { $gt: 100 }
            }
  }

    ]
).pretty()


/*uso más de 2 colecciones a la vez, sacando datos de todas para averiguar el precio total de las vacunas por paciente, 
solo del grupo sanguineo A, 
en el resultado, eliminamos a los que han pagado menos de 100 euros (precio barato del gobierno),
y de los que han pagado más, quiénes han pagado caro, y quiénes MUY caro (más de 130).
Resultado ordenado de forma descendente, mostrando nombre y precio pagado.*/

db.historial.aggregate(
  [
{ $match : { "sangre.tipo" : { $eq: "A" } } },
    {
        $unwind: "$detalle_vacuna"
    },
        {
            $lookup: {
                from: "vacuna",
                localField: "detalle_vacuna.cod_vacuna",
                foreignField: "cod_vacuna",
                as: "vacuna_recibida"
            }
        },
 {
            $lookup: {
                from: "paciente",
                localField: "cod_paciente",
                foreignField: "cod_paciente",
                as: "paciente_vacunado"
            }
        },
        {
            $set: {
                precio_cada_dosis: {$arrayElemAt: ["$vacuna_recibida",0]}
            }
        },

        {
            $project: {
                _id: 0,
                "cod_paciente": 1,
                "detalle_vacuna.cod_vacuna": 1,
                "detalle_vacuna.dosis_recibidas": 1,
                "vacuna_recibida.precio_dosis": 1,
                "paciente_vacunado.nombre_paciente": 1,
                "coste_por_vacuna": {$multiply: 
                   ["$detalle_vacuna.dosis_recibidas", "$precio_cada_dosis.precio_dosis"]}
            }
        },
{
        $group: {
                _id: { 
                    ref: "$cod_paciente",
                    nombre: "$paciente_vacunado.nombre_paciente",
                         },

            "total_vacunas": { $sum: "$coste_por_vacuna" }
        }
    },
        {
            $sort: {
                "total_vacunas": -1
            }
        },
  {
            $match: {
               "total_vacunas": { $gt: 100 }
            }
  },
{
         $project:
           {
                
		"persona inmunizada": "$_id",
                _id: 0,

		"coste total vacunas": "$total_vacunas",
             	"precio pagado":
               {
                 $cond: { if: { $gte: [ "$total_vacunas", 130 ] }, then: "muy caro", else: "caro" }
               }
           }
      }

    ]
).pretty()