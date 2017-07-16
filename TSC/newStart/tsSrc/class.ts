class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet(): string {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");


// 测试修饰符
/**
 * public: 在实例上也可访问
 * protected: 在类里面可以访问，继承这个类之后也可以访问它(可以通过public的方法读写)
 * private： 只在本个类里面可以访问(可以通过public的方法读写)
 */
class papa {
	protected name: string
	constructor(bane: string) {
		this.name = bane
	}
}

class son extends papa {
	private sex: string
	constructor(name: string, theSex: string) {
		super(name)
		this.sex = theSex
	}
	public getName() {
		return this.name
	}
}

let hehe = new son('das', 'nan')
hehe.getName()