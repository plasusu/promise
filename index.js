class ZPromise {
    constructor(func) {
        const self = this
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined

        function resolve(value) {
            self.status = 'resolved'
            self.value = value
        }

        function reject(reason) {
            self.status = 'rejected'
            self.reason = reason
        }

        try {
            func(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(resolve, reject) {
        if (this.status === 'resolved') {
            resolve(this.value)
        } else if (this.status = 'rejected') {
            reject(this.reason)
        }
    }
}


new ZPromise((resolve, reject) => {
    resolve('success')
}).then((val) => {
    console.log(val)
})