declare global {
    var sessions: Sessions | undefined
}

export default class Sessions {
    // private static instance: Sessions;
    private sessions: {[token: string]: {
        username: string,
        expire: number
    } | undefined } = {};

    private readonly ONE_HOUR = 3600000;

    private constructor() {
        this.hasSession = this.hasSession.bind(this);
        this.isSessionExpired = this.isSessionExpired.bind(this);
        this.findTokenByUsername = this.findTokenByUsername.bind(this);
    }

    public static getInstance() {
        if(!global.sessions) {
            global.sessions = new Sessions();
        }
        return global.sessions;
    }
    
    public createSession(username: string, token: string) {
        const { ONE_HOUR, findTokenByUsername } = this;

        const tokenExisted = findTokenByUsername(username);
        if (tokenExisted) {
            delete this.sessions[tokenExisted];
        }

        this.sessions[token] = {
            username,
            expire: Date.now() + ONE_HOUR
        };

        console.log("created:", this.sessions);
    }

    private findTokenByUsername(username: string) {
        const { sessions } = this;
        for(const token of Object.keys(sessions)) {
            if(sessions[token]?.username === username) {
                return token;
            }
        }
    }

    public findUsernameByToken(token: string) {
        return this.sessions[token]?.username;
    }

    public hasSession(token: string) {
        const { sessions, isSessionExpired } = this;
        if(!sessions[token]) return false;
        if(isSessionExpired(token)) {
            this.sessions[token] = undefined;
            return false;
        }
        return true;
    }

    public isSessionExpired(token: string) {
        if(this.sessions[token]!.expire < Date.now()) return true;

        return false;
    }

    public finishSession(token: string) {
        this.sessions[token] = undefined;
    }
}