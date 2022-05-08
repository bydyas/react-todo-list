
class TodoService {
    #url = `https://62769ab3bc9e46be1a18698e.mockapi.io/todoslist/todo`;

    async getResource(url) {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    async getTodoList() {
        const res = await this.getResource(this.#url);
        return res;
    }

    async putResource(url, data) {
        let res = await fetch(`${url}/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    async putTodoList(data) {
        const res = await this.putResource(this.#url, data);
        console.log(res);
    }
}

export default TodoService;