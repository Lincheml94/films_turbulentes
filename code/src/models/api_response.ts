// T représente un type générique : type variable
type ApiResponse<T> = {
	status: number;
	message: string;
	//? : optionnel
	data?: T;
};

export type { ApiResponse };
