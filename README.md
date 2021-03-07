# Este es el github de **ANTONIO ÁVILA DELGADO** (1º ASIR)
Este proyecto tiene una gran conexión con el mundo real en el que estamos afectados por la pandemia de la  **COVID-19**.
Conseguir la inmunidad (a través de vacunas) es primordial.

Tenemos las siguientes **premisas**:

* la inmunidad **total** se consigue con 4 dosis.
* a causa de problemas de producción farmacéutica, el gobierno ha decidido que las dosis pueden ser de cualquier fabricante, hasta llegar a 4.
* el presupuesto público ya no puede costear la vacunación gratuita, por tanto el importe se traslada a los pacientes.
* el gobierno ha prometido que el paciente pagará un precio barato por la inmunidad total (menos de 100 euros)
* debido a la complejidad de la situación, se nos pide trabajar con más de 2 colecciones, donde los pacientes ya han recibido las 4 dosis.
* en las múltiples colecciones, se mezclan campos de distintos tipos (cadenas de caracteres, números [enteros y decimales], booleanos, fechas, entre otros. 
* nos encontramos ante una compleja relación N:M (una vacuna puede ir a varios pacientes, un paciente puede recibir varias vacunas).


Tenemos el siguiente **objetivo**: comprobar que el gobierno está cumpliendo su promesa. Es algo complejo en naturaleza por sus múltiples vertientes:

* sacar datos de las múltiples colecciones para averiguar el precio por dosis de las vacunas, por separado (según fabricante), por paciente.
* solo tendremos en cuenta a los pacientes con grupo sanguíneo "A" (que según los estudios, son los más expuestos al virus).
* eliminar a los que han pagado menos de 100 euros (pagaron precio barato prometido por el gobierno).
* y de los que han pagado más de 100, quiénes han pagado caro, y quiénes MUY caro (más de 30% de sobreprecio).
* Finalmente, que el resultado salga ordenado de forma descendente, mostrando código de paciente, nombre, precio pagado y cómo de caro ha sido.