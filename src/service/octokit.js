const Octokit = require('@octokit/rest')

const checkScopes = (scopeStr) => {
    const scopes = scopeStr.split(",").map((value)=>{
        return value.trim()
    })
    if(scopes.indexOf("delete_repo") === -1 || scopes.indexOf("repo") === -1 ){
        throw new Error("invalid scope for token")
    }
}

const api = (octokit) => {
    return {
        async listRepos() {
            const {data} = await octokit.repos.list({
                type: 'owner',
                sort: 'created',
                per_page: 100
            })
            return data
        },
        async deleteRepo({owner, repo}) {
            await octokit.repos.delete({
                owner, repo
            })
        },
        async profile() {
            const result = await octokit.users.getAuthenticated()
            checkScopes(result.headers["x-oauth-scopes"])
            return result.data
        },
    }
}

export default (token) => {
    if(!token){
        throw new Error("invalid token passed")
    }
    return api(new Octokit({
        auth: 'token ' + token
    }))
}


