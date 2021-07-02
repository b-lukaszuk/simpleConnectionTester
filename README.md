# simpleConnectionTester

Deployed version of [connectionBuildTestApp](https://github.com/b-lukaszuk/PB_JSD_2020_2021/tree/master/s2z5_07_05_2021/01)

# Tresc zadania

You have been giving a task of building and testing a network. You are receiving commands and should execute them in order they have been send. The commands are made from three elements. Operation B – build connection, T – test if connection exists and give information as true or false. The two last elements are two IP addresses. Start IP and end IP. 

<pre>
[
	"B 100.100.100.1 100.100.100.2",
	"B 100.100.100.1 100.100.100.3",
	"B 100.100.100.10 100.100.100.11",
	"T 100.100.100.1 100.100.100.3",
	"T 100.100.100.10 100.100.100.2",
	"T 100.100.100.10 100.100.100.11",
	"B 100.100.100.11 100.100.100.2",
	"T 100.100.100.10 100.100.100.3",
	"T 100.100.100.100 100.100.100.103",
]
</pre>

# Dodatkowe info od Karola

## Do Task 1

Otrzymujemy tabele polecen (patrz wyzej)
B - zbuduj polaczenie miedzy dwoma adresami IP
T - przetestuj czy takie polaczenie bedzie dzialac (czy wczesniej zostalo zbudowane to polaczenie)

jeden node moze byc polaczony z wieksza iloscia innych nodow

T zwraca true/false

placzenie nie musi byc bezposrednie a c, ale tez a-b-c (polaczenie miedzy a i c istnieje przez b)

Napisac zwykly program, a nie uzywac Jest-a ktory byl dzisiaj na wykladzie.

Napisac to z jakas grafika.

Stan poczatkowy - randomowy (z randomowa szansa np. 1/3, 1/4 szans na ozycie komorki)

Dopuszczalne sa zmiany typu: zamiast niby adresu url moga byc krotkie liczby typu 1-9

---

Deplyment za: https://github.com/angular-schule/angular-cli-ghpages
