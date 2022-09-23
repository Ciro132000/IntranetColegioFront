<template>
    <div>
        <div class="mb-3">
              <label for="titulo" class="form-label">Titulo de la tarea</label>
              <input type="text"  class="form-control" id="titulo">
            </div>

            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Descripcion de la tarea</label>
              <textarea  class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <div class="mb-3">
              <label  class="form-label">Fecha de incio</label>
              <input  type="datetime-local" class="form-control" >
            </div>

            <div class="mb-3">
              <label  class="form-label">Fecha limite</label>
              <input  type="datetime-local"  class="form-control">
            </div>
    </div>
</template>