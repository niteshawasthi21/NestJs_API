"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializerInterceptor = void 0;
const operators_1 = require("rxjs/operators");
class SerializerInterceptor {
    intercept(context, next) {
        console.log('I am running before te ndller', context);
        return next.handle().pipe((0, operators_1.map)((data) => {
            console.log('I am running before tHe redponde send out', data);
        }));
    }
}
exports.SerializerInterceptor = SerializerInterceptor;
//# sourceMappingURL=serialize.interceptor.js.map