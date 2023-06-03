import { useResource } from "../../composables/resources.js"
 ressources = useResource.list("http://cyber-dodo.fr:8080/api/v1/customer/all")

 console.log(ressources)
