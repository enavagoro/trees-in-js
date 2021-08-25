
const util = require('util') //Para ver que tienen los objetos dentro :B

const Node = require('./node/node');

class BinarySearchTree {
    constructor() {
      this.root = null
    }
    
    // Inserta un nuevo valor como nodo en el arbol de busqueda binaria
    insert(value) {
      let newNode = new Node(value)
      
      //Si la raiz está vacía setea la raíz como un nuevo nodo
      if (!this.root) {
        this.root = newNode
      } else {
        this.insertNode(this.root, newNode)
      }
    }
    
    // Función de ayuda.
    insertNode(root, newNode) {
      if (newNode.value < root.value) {
        // En el caso de que no haya un nodo a la izquierda solo insertarlo.
        if (!root.left) {
          root.left = newNode
        } else {
          this.insertNode(root.left, newNode)
        }
      } else {
        // Si no hay un nodo a la derecha solo insertarlo.
        if (!root.right) {
          root.right = newNode
        } else {
          this.insertNode(root.right, newNode)
        }
      }
    }
    
    //Recorriendo el árbol del menor al mayor

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    
    inOrderTraverseNode(node, callback) {
        if (node != null) {
         this.inOrderTraverseNode(node.left, callback);
         callback(node.value);
         this.inOrderTraverseNode(node.right, callback);
        }
    }

    //Recorriendo el árbol del mayor al menor 

    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root, callback);
    }

    preOrderTraverseNode(node, callback) {
        if (node != null) {
        callback(node.value);
         this.preOrderTraverseNode(node.left, callback); 
         this.preOrderTraverseNode(node.right, callback);
        }
    }

    //Recorriendo los hijos de árbol y luego el nodo padre 
    postOrderTraverse(callback){
        this.preOrderTraverseNode(this.root, callback);
    }

    postOrderTraverseNode(node, callback){
        if(node != null){
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.left, callback);
            callback(node.value);
        }
    }
  
    //Encuentra el nodo con el valor mínimo
    
    getMinValue(){
        return this.minNode(this.root);
    }

    minNode(node) {
        let current = node;

        while (current != null && current.left != null) {
            current = current.left;
        }

        return current;
    }

    //Encuentra el nodo con el valor máximo

    getMaxValue(){
        return this.maxNode(this.root);
    }

    maxNode(node){
        let current = node;

        while(current != null && current.right != null){
            current = current.right
        }

        return current;
    }

    //busqueda de un nodo

    search(value){
        return this.searchNode(this.root, value);
    }

    searchNode(node,value){
        if(!node){
            return false;
        }
        if(value < node.value){
            return this.searchNode(node.left,value);
        }else if(value > node.value){
            return this.searchNode(node.right, value);
        }else{
            return node;
        }
    }

    //borrar un nodo.
    remove(value){
      this.root = this.removeNode(this.root, value); 
    }

    removeNode(node, value){
      if(node == null){
        return null;
      }
      if(value < node.value){
        node.left = this.removeNode(node.left, value);
        return node;
      }
      else if(value > node.value){
        node.right = this.removeNode(node.right, value);
        return node;
      }
      else{        
        // el primer caso ocurre cuando el nodo no tiene hijos.
        if (node.left == null && node.right == null) { 
            node = null; 
            
            return node;
          }
        
        //caso 2 tiene un solo nodo, entonces se borra el padre y el nodo hijo ocupa su lugar 
        if (node.left == null) {
          node = node.right;
          return node;
        }

        else if (node.right == null) {
          node = node.left;
          return node;
        }

        //caso 3 tiene 2 nodos hijo, remueve el valor menor del sub árbol de la derecha y lo reemplaza por el nodo borrado.
        const aux = this.minNode(node.right);
        node.value = aux.value; 
        node.right = this.removeNode(node.right, aux.value); 
        return node;
      }
    }
  }

    const tree = new BinarySearchTree();
    tree.insert(11);
    tree.insert(7);
    tree.insert(15);
    tree.insert(5);
    tree.insert(3);
    tree.insert(9);
    tree.insert(8);
    tree.insert(10);
    tree.insert(13);
    tree.insert(12);
    tree.insert(14);
    tree.insert(20);
    tree.insert(18);
    tree.insert(25);

    tree.remove(15);

    console.log(util.inspect(tree, {showHidden: false, depth: null}));
    