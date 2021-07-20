# MVVM

## OOP architecture

**MVVM** (**Model–view–viewmodel**) is an OOP software architecture model. Its core is to separate the logic and view of our application to improve code maintainability and application robustness. We can use a picture to describe:

![](//img.alicdn.com/imgextra/i3/O1CN01jiB7h723ZFf0lBCTo_!!6000000007269-55-tps-1244-432.svg)

To explain, the View (view layer) is responsible for maintaining the UI structure and style, and is responsible for data binding with the ViewModel (view model). The data binding relationship here is two-way, that is, the ViewModel (view model) data occurs. Changes will trigger the update of the View (view layer), and at the same time changes in the data of the view layer will trigger the changes of the ViewModel (view model). Model is more biased towards the actual business data processing model. Both ViewModel and Model are congested models, and both are injected with business logic from different fields. For example, the business logic of ViewModel is more biased towards the domain logic of the view interaction layer, while the business logic of Model is more biased towards the processing logic of business data.

So, what should the Formily solution be positioned in MVVM?

Obviously, Formily provides two tiers of View and ViewModel capabilities. View is @formily/react @formily/vue, which is specifically used to bridge communication with @formily/core. Therefore, @formily/core is positioned at the ViewModel layer. ,

Where is the Model layer?

Of course it is our actual business code layer, this layer formily will not manage, so at this layer, whether users maintain a Model in OOP mode or maintain a series of business logic function sets in FP mode, formily Don't care.

Therefore, this also makes formily's intrusion into the business very low, because formily's goal is to reduce the cost of users designing ViewModels, allowing users to focus more on the realization of business logic.

## FP architecture

Remember before the React team used the simplest expression **UI = fn(State)** to express the entire React system? Such a functional UI is very simple and clear. Will it conflict with the MVVM model?

There is no conflict, because in the MVVM mode, the relationship between View and ViewModel is actually approximately equal to **UI = fn(State)**, because ViewModel is a congestion model injected with logic, which is related to **fn(State) ** can achieve the same goal, but it is a more OOP expression, but **fn(State)** is a more functional expression, the state exists as an anemia model, through one function after another, Immutable updates to the anemia model are finally reflected in the UI.

Therefore, from the perspective of separation of logic and data, functional expression is clearer, but functional expression requires all data to be Immutable. Therefore, in scenarios with high performance requirements, the benefits of using a functional model will not be too great, of course, this is only the case in the js language. On the contrary, the MVVM model requires more data for Reactive data, that is, a responsive data model that can manipulate data by reference, so that data changes can be accurately monitored, and finally reflected on the UI.

Therefore, in the form scenario, the performance advantage of the MVVM mode will be better. The most important thing is that most of the GUI products that have survived for decades almost all use MVVM coincidentally. It seems that in the front-end field, the function The type system will be more academic. In terms of the actual benefits to the business, MVVM is still the first choice.
