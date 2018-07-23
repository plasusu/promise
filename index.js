class ZPromise {
    constructor(func) {
        const self = this
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        this.resolveArray = []
        this.rejectArray = []

        function resolve(value) {
            self.status = 'resolved'
            self.value = value
            self.resolveArray.forEach(v => {
                v(self.value)
            })
        }

        function reject(reason) {
            self.status = 'rejected'
            self.reason = reason
            self.rejectArray.forEach(v => {
                v(self.reason)
            })
        }

        try {
            func(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(resolve, reject) {
        if (this.status === 'pending') {
            this.resolveArray.push(resolve)
            this.rejectArray.push(reject)
        } else if (this.status === 'resolved') {
            resolve(this.value)
        } else if (this.status = 'rejected') {
            reject(this.reason)
        }
    }
}

// v1: 只能处理同步方法
new ZPromise((resolve, reject) => {
    resolve('success')
}).then((val) => {
    console.log(val)
})

// v2: 处理异步能力
new ZPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    })
}).then((val) => {
    console.log(val)
})