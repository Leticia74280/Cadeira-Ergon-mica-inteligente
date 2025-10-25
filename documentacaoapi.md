
# 📘 Documentação da API de Gerenciamento de Usuários

**Versão:** 1.0.0  
**Base URLs:**  
- Produção: `https://api.exemplo.com/v1`  
- Localhost: `http://localhost:3000/v1`  
**Contato:** suporte@exemplo.com  

---

## 🧠 Endpoints

### **1. Listar todos os usuários**
**GET** `/users`  
Retorna uma lista com todos os usuários cadastrados.

#### ✅ Respostas
| Código | Descrição | Exemplo |
|--------|------------|----------|
| 200 | Sucesso — Lista de usuários | `[{"id":1,"nome":"Ana Silva","email":"ana.silva@example.com"}]` |

---

### **2. Criar novo usuário**
**POST** `/users`  
Cria um novo usuário com nome e e-mail.

#### 📦 Body (JSON)
```json
{
  "nome": "Carlos Santos",
  "email": "carlos.santos@example.com"
}
```

#### ✅ Respostas
| Código | Descrição | Exemplo |
|--------|------------|----------|
| 201 | Usuário criado com sucesso | `{"id":3,"nome":"Carlos Santos","email":"carlos.santos@example.com"}` |
| 400 | Requisição inválida — dados incorretos | `{"erro": "Dados inválidos"}` |

---

### **3. Buscar usuário pelo ID**
**GET** `/users/{id}`  
Retorna os dados de um usuário específico.

#### 🔢 Parâmetros
| Nome | Tipo | Obrigatório | Descrição |
|------|------|--------------|------------|
| id | integer | ✔️ | ID do usuário |

#### ✅ Respostas
| Código | Descrição | Exemplo |
|--------|------------|----------|
| 200 | Usuário encontrado | `{"id":1,"nome":"Ana Silva","email":"ana.silva@example.com"}` |
| 404 | Usuário não encontrado | `{"erro": "Usuário não encontrado"}` |

---

### **4. Atualizar usuário**
**PUT** `/users/{id}`  
Atualiza as informações de um usuário existente.

#### 🔢 Parâmetros
| Nome | Tipo | Obrigatório | Descrição |
|------|------|--------------|------------|
| id | integer | ✔️ | ID do usuário |

#### 📦 Body (JSON)
```json
{
  "nome": "Ana Silva Lima",
  "email": "ana.lima@example.com"
}
```

#### ✅ Respostas
| Código | Descrição | Exemplo |
|--------|------------|----------|
| 200 | Atualização bem-sucedida | `{"id":1,"nome":"Ana Silva Lima","email":"ana.lima@example.com"}` |
| 404 | Usuário não encontrado | `{"erro": "Usuário não encontrado"}` |

---

### **5. Deletar usuário**
**DELETE** `/users/{id}`  
Remove permanentemente um usuário do sistema.

#### 🔢 Parâmetros
| Nome | Tipo | Obrigatório | Descrição |
|------|------|--------------|------------|
| id | integer | ✔️ | ID do usuário |

#### ✅ Respostas
| Código | Descrição |
|--------|------------|
| 204 | Usuário deletado com sucesso |
| 404 | Usuário não encontrado |

---

## 🧱 Modelos (Schemas)

### **User**
| Campo | Tipo | Exemplo | Obrigatório |
|--------|------|----------|--------------|
| id | integer | 1 | ✔️ |
| nome | string | João Silva | ✔️ |
| email | string | joao.silva@example.com | ✔️ |

### **UserInput**
| Campo | Tipo | Exemplo | Obrigatório |
|--------|------|----------|--------------|
| nome | string | Maria Souza | ✔️ |
| email | string | maria.souza@example.com | ✔️ |
