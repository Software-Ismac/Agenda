import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Tipos
type Cupon = { img: string; uri: string };
type EventoCalendario = { date: Date; description: string };

// Estructura del contexto
interface IsmacDataContextType {
  cupones: Cupon[];
  setCupones: React.Dispatch<React.SetStateAction<Cupon[]>>;
  calendario: EventoCalendario[];
  setCalendario: React.Dispatch<React.SetStateAction<EventoCalendario[]>>;
}

// Crear el contexto
const IsmacDataContext = createContext<IsmacDataContextType | undefined>(
  undefined
);

// Hook personalizado para consumir el contexto
export const useIsmacData = () => {
  const context = useContext(IsmacDataContext);
  if (!context) {
    throw new Error("useIsmacData debe usarse dentro de IsmacDataProvider");
  }
  return context;
};

// Provider
export const IsmacDataProvider = ({ children }: { children: ReactNode }) => {
  const [cupones, setCupones] = useState<Cupon[]>([]);
  const [calendario, setCalendario] = useState<EventoCalendario[]>([]);

  return (
    <IsmacDataContext.Provider
      value={{ cupones, setCupones, calendario, setCalendario }}
    >
      {children}
    </IsmacDataContext.Provider>
  );
};

interface WithIsmacProps {
  calendar: EventoCalendario[];
  cupons: Cupon[];
}

// Este componente interno se encarga de llenar el contexto
const InjectIsmacContext = ({
  calendar,
  cupons,
  children,
}: React.PropsWithChildren<WithIsmacProps>) => {
  const { setCalendario, setCupones } = useIsmacData();

  useEffect(() => {
    setCalendario(calendar);
    setCupones(cupons);
  }, [calendar, cupons]);

  return <>{children}</>;
};

// El HOC principal
const withIsmacContext = (WrappedComponent: React.ComponentType<any>) => {
  return function WithContextWrapper(props: any) {
    const { calendar, cupons, ...rest } = props;

    return (
      <IsmacDataProvider>
        <InjectIsmacContext calendar={calendar} cupons={cupons}>
          <WrappedComponent {...rest} />
        </InjectIsmacContext>
      </IsmacDataProvider>
    );
  };
};

export default withIsmacContext;
